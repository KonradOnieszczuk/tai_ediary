package ediary.security;

import ediary.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.social.connect.Connection;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.User;

public class AuthUtil {
    protected static final Logger log = LoggerFactory.getLogger(AuthUtil.class);

    public static void authenticate(Connection<?> connection) {
        User user = null;
        if (connection.getKey().getProviderId().equals("facebook")) {
            Facebook facebook = (Facebook) connection.getApi();
            String [] fields = { "id", "email",  "first_name", "last_name" };
            user = facebook.fetchObject("me", User.class, fields);
        }
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user.getId() + "." + user.getFirstName() + " " + user.getLastName(), null, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        log.info("User {} {} {} connected.", user.getId(), user.getFirstName(), user.getLastName());
    }
}
