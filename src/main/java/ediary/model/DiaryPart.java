package ediary.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiaryPart {
    @Id
    private long diaryPartId;

    @Column(nullable = false)
    private LocalDate day;

    private LocalTime startTime;

    private LocalTime endTime;

    private String content;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user")
    @JsonManagedReference
    private User user;
}
