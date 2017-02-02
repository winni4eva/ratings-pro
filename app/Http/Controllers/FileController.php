<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Services\User\UserService;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use PDF;
use Excel;

class FileController extends Controller
{
    use AuthenticatesUsers;

    protected $userService;

    public function __construct(UserService $userService){
        $this->userService = $userService;
    }

    public function store(Request $request)
    {
        $data = [];

        if($request->get('resource')=='surveys'){
            //$data = $this->userService->getUserSurveys($this->guard()->user()->id);
            $data = $this->userService->getUserSurveyReport($this->guard()->user()->id);

            //if($request->get('fileType')=='pdf'){
                if($path = $this->generateReport($request->get('resource'), $data, $request->get('fileType')))
                    return response()->json(
                        [
                            'success'=>'File generated successfully.',
                            'file' => $this->download($path)
                        ],200);

                return response()->json(['error'=>'Error generating report'], 403);
            //}
        }
    
    }

     private function generateReport($resource, $surveys, $fileType){
         
         $dirSeparator = DIRECTORY_SEPARATOR;
        
        //$logoPath = public_path()."/images/home/gallery1.jpg";
        $template = '';

        $template .= ($fileType == 'pdf')? "<html><head>
                    <title>{$resource}</title>" : '';
        $template .= ($fileType == 'pdf')? '<style type="text/css">
                        body {font-family:Tahoma;}
                        img {border:0;}
                        #page {width:990px;margin:0 auto;padding:15px;}
                        #logo {float:left;margin:0;}
                        #address {height:181px;margin-left:250px;}
                        table {width:100%;}
                        td {padding:1px;}
                        tr.odd {background:#e1ffe1;}
                    </style>' : '';
                    $template .= ($fileType == 'pdf')? '</head><body><div id=""><div id="logo">':'';
                                $template .= ($fileType == 'pdf')? "<h3>{$resource}</h3>":'';
                                $template .= ($fileType == 'pdf')? '<hr><!-- Content Here -->':'';
                    //$template .= $this->surveyReporter($data);
                    $template .= "<table>
                        <tbody>
                            <tr>";
                   $template .= ($fileType == 'pdf')? '<td><strong>No.</strong></td>':'';
                   $template .= "<td><strong>Branch</strong></td>
                                <td><strong>Question</strong></td>
                                <td><strong>Answer</strong></td>
                                <td><strong>Date</strong></td>
                            </tr>";
                            $num = 0; $myClass = 'odd';
                            foreach ($surveys as $survey) {
                                $num += 1;
                                $myClass = ($num%2 == 0)? 'even' : 'odd';
                                $template .= "<tr class='{$myClass}'>";
                                $template .= ($fileType == 'pdf')? "<td>{$num}</td>":'';
                                $template .= "<td>{$survey->branch_name}</td>
                                                <td>{$survey->question}</td>
                                                <td>{$survey->response_name}</td>
                                                <td>{$survey->rating_date}</td>
                                            </tr>";
                                //logger(collect($survey)->get(0));
                            }      
                    
                       $template .= "</tbody></table>";
                    $template .= ($fileType == 'pdf')? '<!-- Content Here -->
                                <hr>
                            </div><!--end content-->
                        </div><!--end page-->
                    </body></html>' : '';
        
        if($fileType=='pdf') $storagePath = public_path()."{$dirSeparator}reports";
        if($fileType=='excel') $storagePath = resource_path()."{$dirSeparator}views{$dirSeparator}reports";

        $reportPath = "";

        if(!file_exists($storagePath)) mkdir($storagePath);

        switch ($fileType) {
            case 'pdf':
                $htmlPath = $storagePath."{$dirSeparator}{$resource}.html";

                if( $handle = @fopen($htmlPath,'w') ){
                    @fwrite($handle, $template);
                    @fclose($handle);

                    $reportPath = $storagePath."{$dirSeparator}{$resource}.pdf"; 

                    PDF::loadFile( $htmlPath )->save( $reportPath );
                }

                
                break;
            case 'excel':
                $viewPath = $storagePath."{$dirSeparator}{$resource}.blade.php";

                //$reportPath = $viewPath;

                if( $handle = @fopen($viewPath,'w') ){
                    @fwrite($handle, $template);
                    @fclose($handle);

                    Excel::create('Report', function($excel) use($resource, $dirSeparator){
                        $excel->sheet('Sheet 1', function($sheet) use($resource, $dirSeparator){
                            $sheet->loadView("reports.{$resource}");
                        });
                    })->save('xlsx', public_path("reports{$dirSeparator}{$resource}"));

                    $reportPath = public_path("reports{$dirSeparator}{$resource}{$dirSeparator}Report.xlsx");

                }
                break;
            
            default:
                # code...
                break;
        }
        
        return $reportPath;
    }

    public function download($path){

            if(file_exists($path)){
                return base64_encode( file_get_contents($path) );
            }else{
                return base64_encode('<p>No File Found</p>');
            }
    }

    private function surveyReporter($surveys){
        $template = "<table>
                        <tbody>
                            <tr>
                                <td><strong>No.</strong></td>
                                <td><strong>Branch</strong></td>
                                <td><strong>Question</strong></td>
                                <td><strong>Answer</strong></td>
                            </tr>";
                            $num = 0; $myClass = 'odd';
                            foreach ($surveys as $survey) {
                                $num += 1;
                                $myClass = ($num%2 == 0)? 'even' : 'odd';
                                $template .= "<tr class='{$myClass}'>
                                                <td>{$num}</td>
                                                <td>{$survey->name}</td>
                                                <td>{$survey->question}</td>
                                                <td>{$survey->category_name}</td>
                                            </tr>";
                            }      
                    
                       $template .= "</tbody></table>";

                    return $template;
    }


}
