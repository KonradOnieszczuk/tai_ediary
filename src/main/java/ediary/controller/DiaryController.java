
package ediary.controller;

import ediary.model.DiaryPart;
import ediary.repository.DiaryPartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
public class DiaryController {

    @Autowired
    private DiaryPartRepository diaryPartRepository;

    @RequestMapping(value = "/api/calendar", method = RequestMethod.GET)
    public List<DiaryPart> calendar() {

        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        String[] userParts = principal.getName().split("\\.");
        Long userId = Long.parseLong(userParts[0]);
        List<DiaryPart> list = new ArrayList<>();
        diaryPartRepository.findDiaryPartsByUserId(userId).forEach(list::add);

        return list;
    }
}