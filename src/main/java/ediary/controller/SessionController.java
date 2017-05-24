package ediary.controller;

import ediary.model.User;
import ediary.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/api/session")
public class SessionController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(method = RequestMethod.GET)
    public User session(Principal principal) {
        long userId = 0;
        String name = null;
        User user = new User(userId, name, null);
        if (principal != null) {
            String[] userParts = principal.getName().split("\\.");
            userId = Long.parseLong(userParts[0]);
            name = userParts[1];
            user = new User(userId, name, null);
            userRepository.save(user);
        }
        return user;
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void logout(HttpSession session) {
        session.invalidate();
    }
}
