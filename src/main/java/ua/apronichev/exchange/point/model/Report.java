package ua.apronichev.exchange.point.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Double tax;

    @Column(nullable = false)
    private Double mdl;

    private Double bankPayment;
    private Double salary;

    @OneToMany(mappedBy = "report", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Operation> operations;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getTax() {
        return tax;
    }

    public void setTax(Double tax) {
        this.tax = tax;
    }

    public Double getMdl() {
        return mdl;
    }

    public void setMdl(Double mdl) {
        this.mdl = mdl;
    }

    public Double getBankPayment() {
        return bankPayment;
    }

    public void setBankPayment(Double bankPayment) {
        this.bankPayment = bankPayment;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public List<Operation> getOperations() {
        return operations;
    }

    public void setOperations(List<Operation> operations) {
        this.operations = operations;
    }


    // getters and setters
}
