<?php
namespace App\Domain\Services\Survey;

use App\Domain\Repositories\Survey\SurveyRepoInterface;
use App\Domain\Services\User\UserService;
use App\Domain\Services\Question\QuestionService;
use App\Domain\Services\Answer\AnswerService;
use App\Domain\Services\ProbeQuestion\ProbeQuestionService;
use DB;
use Exception;

class SurveyService
{
    
    protected $surveyRepo;

    protected $userService;

    protected $questionService;
    
    protected $answerService;

    protected $probeQuestionService;

    public function __construct(
                                SurveyRepoInterface $surveyRepo,
                                UserService $userService,
                                QuestionService $questionService,
                                AnswerService $answerService,
                                ProbeQuestionService $probeQuestionService)
    {
        $this->surveyRepo = $surveyRepo;
        $this->userService = $userService;
        $this->questionService = $questionService;
        $this->answerService = $answerService;
        $this->probeQuestionService = $probeQuestionService;
    }

    /**
     * Save survey
     *
     * @param array $request
     * @return mixed
     */
    public function saveSurvey(array $request)
    {
        DB::beginTransaction();

        try{
                $qtnMap = collect([]);
                $collection = collect($request);
                
                //logger("========START SURVEY==========");
                //logger($collection->get('survey'));
                $survey = $this->surveyRepo->save($collection->get('survey'));
                
                $defaultResponse = \DB::table('responses')->first();

                logger($defaultResponse->id);
      
                collect($collection->get('questions'))->each(function($question, $key)use($survey, $qtnMap, $defaultResponse){
                    //logger("========QUESTION==========");
                    //logger(collect($question));
                    //logger("Question Key => ". $key);

                    $qtn = collect(['question'=> collect($question)->get("question")])->put('survey_id',$survey->id);

                    $savedQuestion = $this->questionService->saveQuestion( $qtn->toArray() );
                    
                    //Store Qustion Array Key Positions To Map Probe Questions To Related Questions If Needed
                    $qtnMap->put($key,$savedQuestion->id);
                    logger(collect($question)->get('expected_answer'));
                    //Save Probe with Map
                    if(collect($question)->has('question_number'))
                        $this->probeQuestionService->saveProbeQuestion(
                            [
                                'question_number' => $qtnMap->get( collect($question)->get('question_number') ),
                                'next_question' => $savedQuestion->id,
                                'expected_answer' => collect($question)->get('expected_answer')? collect($question)->get('expected_answer') : $defaultResponse->id,
                                'equality' => collect($question)->get('equality')
                            ]
                        );
                        //logger("Found a probe for question number => ". collect($question)->get('question_number'));
                        //else logger("No probe question found");
                    
                    //logger("========ANSWERS==========");
                    collect(collect($question)->get("responses"))->each(function($answer)use($savedQuestion){
                    //collect(collect($question)->get("responses"))->each(function($answer){
                        $this->answerService->saveAnswer(collect($answer)->put('question_id',$savedQuestion->id)->toArray());
                        //logger(collect($answer)->put('question_id',2));
                    });
                    
                });
                //logger("========END SURVEY==========");

        }catch(Exception $e){
            DB::rollback();
            logger($e->getMessage()." On Line: ".$e->getLine(). " In ". $e->getFile());
            return false;
        }
        DB::commit();
        return true;
    }

    /**
     * Get surveys
     *
     * @param int $id
     * @return mixed
     */
    public function getSurveys()
    {
        //return $this->userService->getUserSurveys($id);
        return $this->surveyRepo->get();
    }

}