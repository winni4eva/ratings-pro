
export class SurveyInterface{

    survey: {
        title: string;
        branch_id: number;
        category_id: number;
    }

    questions: [
        {
            condition: any;
            result: any;
            question: string,
            responses: [
                {
                    response_id: number
                }
            ]
        }
    ]
    
}