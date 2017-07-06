package ediary;

import ediary.model.DiaryPart;
import ediary.repository.DiaryPartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@Component
public class Loader implements ApplicationRunner {

    private DiaryPartRepository diaryPartRepository;

    @Autowired
    public Loader(DiaryPartRepository diaryPartRepository){
        this.diaryPartRepository = diaryPartRepository;

    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        long userId = 1376743902406200L;
        List<DiaryPart> diaryPartList = Arrays.asList(
                new DiaryPart("niezwykly dzien", LocalDate.parse("2017-06-27"), LocalTime.parse("9:35", DateTimeFormatter.ofPattern("H:m")), LocalTime.parse("18:00", DateTimeFormatter.ofPattern("H:m")), "Something happened", userId)
        );
        diaryPartRepository.save(diaryPartList);
    }
}