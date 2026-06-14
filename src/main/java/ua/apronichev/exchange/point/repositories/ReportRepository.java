package ua.apronichev.exchange.point.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.apronichev.exchange.point.model.Report;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByDateBetween(LocalDate start, LocalDate end);
    Optional<Report> findByDate(LocalDate date);
}
