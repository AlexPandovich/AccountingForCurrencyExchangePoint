package ua.apronichev.exchange.point.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Operation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String currency;
    private Double startDayNominal;
    private Double startDayMdl;
    private Double buyNominal;
    private Double buyMdl;
    private Double sellNominal;
    private Double sellMdl;
    private Double endDayMdl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_id", referencedColumnName = "id" )
    @JsonBackReference
    private Report report;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Double getStartDayNominal() {
        return startDayNominal;
    }

    public void setStartDayNominal(Double startDayNominal) {
        this.startDayNominal = startDayNominal;
    }

    public Double getStartDayMdl() {
        return startDayMdl;
    }

    public void setStartDayMdl(Double startDayMdl) {
        this.startDayMdl = startDayMdl;
    }

    public Double getBuyNominal() {
        return buyNominal;
    }

    public void setBuyNominal(Double buyNominal) {
        this.buyNominal = buyNominal;
    }

    public Double getBuyMdl() {
        return buyMdl;
    }

    public void setBuyMdl(Double buyMdl) {
        this.buyMdl = buyMdl;
    }

    public Double getSellNominal() {
        return sellNominal;
    }

    public void setSellNominal(Double sellNominal) {
        this.sellNominal = sellNominal;
    }

    public Double getSellMdl() {
        return sellMdl;
    }

    public void setSellMdl(Double sellMdl) {
        this.sellMdl = sellMdl;
    }

    public Double getEndDayMdl() {
        return endDayMdl;
    }

    public void setEndDayMdl(Double endDayMdl) {
        this.endDayMdl = endDayMdl;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }


    // getters and setters
}
