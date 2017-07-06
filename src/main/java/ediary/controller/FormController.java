package ediary.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import ediary.model.DiaryPart;
import ediary.repository.DiaryPartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class FormController {
    @Autowired
    private DiaryPartRepository diaryPartRepository;

    @RequestMapping(value = "/api/form/diaryPart", method = RequestMethod.POST)
    public @ResponseBody String addDiaryPart(@RequestBody ObjectNode json) {

        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        String[] userParts = principal.getName().split("\\.");
        Long userId = Long.parseLong(userParts[0]);

        String name = json.get("name").asText();
        String day = json.get("day").asText();
        String startTime = json.get("startTime").asText();
        String endTime = json.get("endTime").asText();
        String content = json.get("content").asText();

        if (name.equals("null") || day.equals("null") || startTime.equals("null") || endTime.equals("null"))
            return "Tylko pole zawartość może być puste ;(";

        DiaryPart diaryPart = new DiaryPart(name, LocalDate.parse(day), LocalTime.parse(startTime, DateTimeFormatter.ofPattern("H:m")), LocalTime.parse(endTime, DateTimeFormatter.ofPattern("H:m")), content, userId);
        diaryPartRepository.save(diaryPart);

        return "Wspomnienie pomyślnie zapisane ;)";
}
}
