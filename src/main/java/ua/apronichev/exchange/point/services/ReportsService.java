package ua.apronichev.exchange.point.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.apronichev.exchange.point.model.Operation;
import ua.apronichev.exchange.point.model.Report;
import ua.apronichev.exchange.point.repositories.ReportRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportsService {
    ReportRepository repository;

    @Autowired
    public ReportsService(ReportRepository repository) {
        this.repository = repository;
    }
    public List<Report> findReportsInRange (LocalDate startDate, LocalDate endDate) {
        return this.repository.findByDateBetween(startDate, endDate);
    }

    public void upsertReport(Report newReport) {
        repository.findByDate(newReport.getDate())
                .map(existing -> {
                    // обновляем поля
                    existing.setTax(newReport.getTax());
                    existing.setMdl(newReport.getMdl());
                    existing.setBankPayment(newReport.getBankPayment());
                    existing.setSalary(newReport.getSalary());

                    // очищаем старые операции
                    existing.getOperations().clear();

                    // добавляем новые операции и проставляем связь
                    for (Operation op : newReport.getOperations()) {
                        op.setReport(existing); // важно!
                        existing.getOperations().add(op);
                    }

                    return repository.save(existing);
                })
                .orElseGet(() -> {
                    for (Operation op : newReport.getOperations()) {
                        op.setReport(newReport);
                    }
                    return repository.save(newReport);
                });
    }
}
