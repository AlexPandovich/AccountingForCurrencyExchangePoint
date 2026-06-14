package ua.apronichev.exchange.point.controllers;

import org.springframework.web.bind.annotation.*;
import ua.apronichev.exchange.point.model.Report;
import ua.apronichev.exchange.point.services.ReportsService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/report")
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class ReportsController {
    ReportsService reportsService;

    public ReportsController(ReportsService reportsService) {
        this.reportsService = reportsService;
    }

    @GetMapping
    public List<Report> getReport(
            @RequestParam("start") String start,
            @RequestParam("end") String end) {

        // Преобразуем строки в LocalDate (если это даты)
        LocalDate startDate = LocalDate.parse(start);
        LocalDate endDate = LocalDate.parse(end);

        // Здесь твоя логика: достать отчёты из БД между startDate и endDate
        List<Report> result = this.reportsService.findReportsInRange(startDate, endDate);
        return  result;
    }

    @PostMapping("/upsert")
    public Report upsertReport(@RequestBody Report report) {
        this.reportsService.upsertReport(report);
        return report;
    }
}
