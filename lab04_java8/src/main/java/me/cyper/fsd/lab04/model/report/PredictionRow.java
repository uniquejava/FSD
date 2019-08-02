package me.cyper.fsd.lab04.model.report;

import java.math.BigDecimal;

public class PredictionRow extends Row {
    // amount
    private BigDecimal incrementAmount = BigDecimal.ZERO;
    private BigDecimal deductionAmount = BigDecimal.ZERO;

    // salary growth
    private BigDecimal salaryGrowth = BigDecimal.ZERO;


    public Object[] getRepresentation() {
        return new Object[]{this.getYear(), formatMoney(this.getSalary()), formatMoney(this.getIncrementAmount()), formatMoney(this.getDeductionAmount()), formatMoney(this.getSalaryGrowth())};
    }

    public BigDecimal getIncrementAmount() {
        return incrementAmount;
    }

    public void setIncrementAmount(BigDecimal incrementAmount) {
        this.incrementAmount = incrementAmount;
    }

    public BigDecimal getDeductionAmount() {
        return deductionAmount;
    }

    public void setDeductionAmount(BigDecimal deductionAmount) {
        this.deductionAmount = deductionAmount;
    }

    public BigDecimal getSalaryGrowth() {
        return salaryGrowth;
    }

    public void setSalaryGrowth(BigDecimal salaryGrowth) {
        this.salaryGrowth = salaryGrowth;
    }
}
