package me.cyper.fsd.lab04.model;

import java.math.BigDecimal;

public class SalaryInput {
    private BigDecimal startingSalary;
    private BigDecimal incInPercent;
    private Frequency incFrequency;
    private BigDecimal decAmount;
    private Frequency decFrequency;
    private int years;

    public BigDecimal getStartingSalary() {
        return startingSalary;
    }

    public void setStartingSalary(BigDecimal startingSalary) {
        this.startingSalary = startingSalary;
    }

    public BigDecimal getIncInPercent() {
        return incInPercent;
    }

    public void setIncInPercent(BigDecimal incInPercent) {
        this.incInPercent = incInPercent;
    }

    public Frequency getIncFrequency() {
        return incFrequency;
    }

    public void setIncFrequency(Frequency incFrequency) {
        this.incFrequency = incFrequency;
    }

    public BigDecimal getDecAmount() {
        return decAmount;
    }

    public void setDecAmount(BigDecimal decAmount) {
        this.decAmount = decAmount;
    }

    public Frequency getDecFrequency() {
        return decFrequency;
    }

    public void setDecFrequency(Frequency decFrequency) {
        this.decFrequency = decFrequency;
    }

    public int getYears() {
        return years;
    }

    public void setYears(int years) {
        this.years = years;
    }

    @Override
    public String toString() {
        return "SalaryInput{" +
                "startingSalary=" + startingSalary +
                ", incInPercent=" + incInPercent +
                ", incFrequency=" + incFrequency +
                ", decAmount=" + decAmount +
                ", decFrequency=" + decFrequency +
                ", years=" + years +
                '}';
    }
}
