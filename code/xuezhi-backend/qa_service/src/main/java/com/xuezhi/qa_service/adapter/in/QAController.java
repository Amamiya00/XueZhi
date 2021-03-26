package com.xuezhi.qa_service.adapter.in;


import com.xuezhi.qa_service.application.QAApplication;
import com.xuezhi.qa_service.domain.entity.Question;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

//@CrossOrigin
@RestController
@RequestMapping("/qa")
public class QAController {

    private QAApplication qaApplication;

    @Autowired
    public QAController(QAApplication qaApplication){
        this.qaApplication = qaApplication;
    }

    @GetMapping("/questions/{school}/{area}")
    public List<Question> getNoAnswerQuestions(@PathVariable String school, @PathVariable String area){
        System.out.println("????");
        return qaApplication.getAllNoAnswerQuestions(school,area);
    }

    @PostMapping("/questions")
    @ApiOperation("create a question by giving some details")
    public void addQuestion(@RequestParam String title,@RequestParam String description,@RequestParam String askerId, @RequestParam String school, @RequestParam String area) throws IOException {
        qaApplication.addQuestion(title, description, askerId, school, area);
    }

    @PutMapping("/questions")
    public void updateQuestion(@RequestParam String questionId,@RequestParam  String title,@RequestParam  String description)
    {
        qaApplication.updateQuestion(questionId, title, description);
    }

    @DeleteMapping("/questions/{questionId}")
    public void deleteQuestion(@PathVariable("questionId") String questionId)
    {
        qaApplication.deleteQuestion(questionId);
    }

    @PostMapping("/answers")
    public void addAnswer(@RequestParam String questionId,@RequestParam  String authorId,@RequestParam  String description)
    {
        qaApplication.addAnswer(questionId, authorId, description);
    }

    @PutMapping("/answers")
    public void updateAnswer(@RequestParam String questionId,@RequestParam  String authorId,@RequestParam  String description)
    {
        qaApplication.updateAnswer(questionId, authorId, description);
    }

    @DeleteMapping("/answers/{questionId}/{authorId}")
    public void deleteAnswer(@PathVariable("questionId") String questionId,@PathVariable("authorId") String authorId)
    {
        qaApplication.deleteAnswer(questionId, authorId);
    }

    @PutMapping("/likes")
    public void updateLikes(@RequestParam String questionId, @RequestParam String authorId, @RequestParam String likeUserId){
        qaApplication.updateLikes(questionId, authorId, likeUserId);
    }

    @PutMapping("/answers/comments")
    public void addComment(@RequestParam String questionId, @RequestParam String authorId, @RequestParam String commentatorId, @RequestParam String description){
        qaApplication.addComment(questionId, authorId, commentatorId, description);
    }
}
