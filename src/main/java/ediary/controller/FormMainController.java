package ediary.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FormMainController {

    @RequestMapping(value = "/api/form")
    public String form() {
        return "form";
    }

}
