package ediary.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import ediary.service.LocalDateSerializer;
import ediary.service.LocalTimeSerializer;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
public class DiaryPart {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long diaryPartId;

    private String name;

    @JsonSerialize(using = LocalDateSerializer.class)
    @Column(nullable = false)
    private LocalDate day;

    @JsonSerialize(using = LocalTimeSerializer.class)
    private LocalTime startTime;

    @JsonSerialize(using = LocalTimeSerializer.class)
    private LocalTime endTime;

    private String content;

    private Long userId;

    public DiaryPart (String name, LocalDate day, LocalTime startTime, LocalTime endTime, String content, Long userId){
        this.name = name;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.content = content;
        this.userId = userId;
    }
}
