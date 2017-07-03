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
@AllArgsConstructor
public class DiaryPart {
    @Id
    private long diaryPartId;

    @JsonSerialize(using = LocalDateSerializer.class)
    @Column(nullable = false)
    private LocalDate day;

    @JsonSerialize(using = LocalTimeSerializer.class)
    private LocalTime startTime;

    @JsonSerialize(using = LocalTimeSerializer.class)
    private LocalTime endTime;

    private String content;

    private Long userId;
}
