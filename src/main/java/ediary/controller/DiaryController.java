package ediary.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DiaryController {

    @RequestMapping(value = "/api/diary")
    public String diary() {
        return "diary";
    }
}
