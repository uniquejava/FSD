package me.cyper.fsd.lab04.model.report;

import java.math.BigDecimal;
import java.math.RoundingMode;

public abstract class Row {
    // prediction year (1, 2, ...)
    private int year;

    // starting salary
    private BigDecimal salary = BigDecimal.ZERO;

    // number
    private int times;

    // percentage
    private double percent;

    // amount
    private BigDecimal amount = BigDecimal.ZERO;

    public abstract Object[] getRepresentation();

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public int getTimes() {
        return times;
    }

    public void setTimes(int times) {
        this.times = times;
    }

    public double getPercent() {
        return percent;
    }

    public void setPercent(double percent) {
        this.percent = percent;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    protected static double formatMoney(BigDecimal money) {
        money = money.setScale(2, RoundingMode.HALF_UP);
        return money.doubleValue();
    };

}
