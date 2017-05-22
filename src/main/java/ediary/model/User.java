package ediary.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    private long userId;

    @Column(nullable = false)
    private String name;

    public User(long userId, String name) {
        this.userId = userId;
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof User) {
            User u = (User) obj;

            return Objects.equals(userId, u.userId) && Objects.equals(name, u.name);
        }

        return false;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, name);
    }

    @Override
    public String toString() {
        return "User id: " + this.userId + " Name: " + this.name;
    }
}
