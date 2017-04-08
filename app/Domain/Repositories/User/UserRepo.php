<?php
namespace App\Domain\Repositories\User;

use App\User;

class UserRepo implements UserRepoInterface
{
    protected $model;

    public function __construct(User $user)
    {
        $this->model = $user;
    }

    /**
     * save user data
     *
     * @param array $request
     * @return mixed
     */
    public function save(array $request)
    {

        $role_branch_zone_id = ($request['role']=='branch')
                                ? $request['branch_id']
                                : ($request['role']=='zonal')
                                ? $request['zone_id']
                                : 0;
        
        $user = $this->model->updateOrCreate(['id'=> collect($request)->get('id')],[
            'email' => $request['email'],
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'company' => $request['company'],
            'role' => $request['role'],
            'role_branch_zone_id' => $role_branch_zone_id,
            'password' => array_key_exists('passwords', $request)
                            ? bcrypt($request["passwords"]['password']) 
                            : bcrypt($request['password']),
        ]);

        //$request['admin']

        $user->branchUser()->create(['branch_id' => $request['branch_id'], 'admin' => 0 ]);

        return $user;
    }

    /**
     * get user data
     *
     * @param array $request
     * @return mixed
     */
    public function get(array $request, array $fields = [])
    {
        if(collect($request)->get('id') > 0)
            return $this->model->with(['branchUser'=>function($q){
                $q->limit(1);
            }])->find( collect($request)->get('id') );

        if(collect($fields)->count()>0)
        {
            foreach($fields as $field) $query = $this->model->where($field, $request[$field])->with(['branchUser']);

            return $query->get();
        }

        return $this->model->with(['branchUser'])->get();
    
    }

    /**
     * get user branches
     *
     * @param int $id
     * @return mixed
     */
    public function userBranches($id)
    {

        return $this->model->with('branches')
                    ->where('id', $id)
                    ->get();
    
    }

    /**
     * get user branches
     *
     * @param int $id
     * @return mixed
     */
    public function userCategories($id)
    {

        return $this->model->with(['branches.categories'])
                            ->where('id', $id)
                            ->get();
    
    }

    /**
     * get user surveys
     *
     * @param int $id
     * @return mixed
     */
    public function userSurveys($id)
    {

        // $result = $this->model->with(['branches.categories.surveys.questions.probeQuestions.answers.response.images'])
        //                     ->where('id', $id)
        //                     ->get();

        // $result = $this->model->with([
        //     'branches' => function ($query) {
        //         $query->select('*');
        //     },
        //     'branches.surveys.category' => function ($query) {
        //         $query->select('*');
        //     },
        //     'branches.surveys' => function ($query) {
        //         $query->select('*');
        //     },
        //     'branches.surveys.questions' => function ($query) {
        //         $query->select('*');
        //     },
        //     'branches.surveys.questions.answers' => function ($query) {
        //         $query->select('*');
        //     },
        //     'branches.surveys.questions.answers.response' => function ($query) {
        //         $query->select('*');
        //     },
        //     'branches.surveys.questions.answers.response.images' => function ($query) {
        //         $query->select('*');
        //     },
        //     'branches.surveys.questions.probeQuestions.answers.response.images' => function ($query) {
        //         $query->select('*');
        //     }
        // ])->where('id', $id)->get();
        
        // $result = $this->model->with([
        //     'branches' => function ($query) {
        //         $query->select('*');
        //     },
        //     'branches.surveys.category' => function ($query) {
        //         $query->select('*');
        //     },
        //     'branches.surveys' => function ($query) {
        //         $query->select('*');
        //     },
        //     'branches.surveys.questions' => function ($query) {
        //         $query->select('*');
        //     },
        //     'branches.surveys.questions.answers' => function ($query) {
        //         $query->select('*');
        //     },
        //     'branches.surveys.questions.answers.response' => function ($query) {
        //         $query->select('*');
        //     },
        //     'branches.surveys.questions.answers.response.images' => function ($query) {
        //         $query->select('*');
        //     },
        //     'branches.surveys.questions.probeQuestions.answers.response.images' => function ($query) {
        //         $query->select('*');
        //     }
        // ])->where('id', $id)->get();

        $user = \DB::table('users')
                    ->leftjoin('branch_user', 'users.id', '=', 'branch_user.user_id')
                    ->leftjoin('branches', 'branch_user.branch_id', '=', 'branches.id')
                    ->where('users.id', $id)
                    ->select('users.id as userId','branches.id as branchId')
                    ->first();
        
        $result = \App\Branch::with([
            'surveys.questions.answers.response.rater.image' => function ($query) {
                $query->select('*');
            },
            'surveys.questions.probeQuestions.answers.response.rater.image' => function ($query) {
                $query->select('*');
            }
        ])
        ->where('branches.id', $user->branchId)
        ->get();
        
        return [ $result, $user->branchId]; 
    
    }

    /**
     * get user survey report
     *
     * @param int $id
     * @return mixed
     */
    public function userSurveyReport($id)
    {
        
        return \App\Rating::with(
                                    [
                                        'previousResponse' => function($q){
                                            $q->addSelect(['id', 'name as pResponseName']);
                                        }
                                    ]
                                )
                    ->leftjoin('questions', 'ratings.question_id', '=', 'questions.id')
                    ->leftjoin('responses', 'ratings.response_id', '=', 'responses.id')
                    ->leftjoin('raters', 'responses.id', '=', 'raters.response_id')
                    ->leftjoin('branches', 'ratings.branch_id', '=', 'branches.id')
                    ->leftjoin('surveys', 'ratings.survey_id', '=', 'surveys.id')
                    ->get(
                            [
                                'questions.question',
                                'surveys.title',
                                'raters.score',
                                'responses.name as response_name',
                                'branches.name as branch_name',
                                'ratings.created_at as rating_date'
                            ]
                        );
                    
        //logger($data);

        // return $this->model
        //             ->leftjoin('branch_user', 'users.id', '=', 'branch_user.user_id')
        //             ->leftjoin('branches', 'branch_user.branch_id', '=', 'branches.id')
        //             ->leftjoin('categories', 'branches.id', '=', 'categories.branch_id')
        //             ->leftjoin('surveys', 'categories.id', '=', 'surveys.category_id')
        //             ->leftjoin('questions', 'surveys.id', '=', 'questions.survey_id')
        //             ->leftjoin('answers', 'questions.id', '=', 'answers.question_id')
        //             ->leftjoin('responses', 'answers.response_id', '=', 'responses.id')
        //             ->where('users.id', $id)
        //             ->select(
        //                         [
        //                             'branches.name as branch_name',
        //                             'branches.first_name as admin_first_name',
        //                             'branches.last_name as admin_last_name',
        //                             'categories.name as category_name',
        //                             'surveys.title as survey_name',
        //                             'surveys.active as survey_active',
        //                             'questions.question as survey_question',
        //                             'responses.name as question_answer',
        //                             'responses.score as question_score'
        //                         ]
        //             )->get();
    
    }

}