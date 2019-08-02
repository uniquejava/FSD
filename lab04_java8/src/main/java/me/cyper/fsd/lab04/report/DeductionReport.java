package me.cyper.fsd.lab04.report;

import com.google.common.collect.Lists;
import me.cyper.fsd.lab04.model.SalaryInput;
import me.cyper.fsd.lab04.model.report.DeductionRow;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.List;

public class DeductionReport extends Report {

    public List<DeductionRow> calculateData(SalaryInput input) {
        List<DeductionRow> rows = Lists.newArrayList();

        for (int i = 0; i < input.getYears(); i++) {

            // deductions
            BigDecimal start = input.getStartingSalary();
            if (i > 0) {
                DeductionRow lastRow = rows.get(i - 1);
                start = lastRow.getSalary().subtract(lastRow.getAmount());
            }

            int times = input.getDecFrequency().getValue();
            BigDecimal decOnIncome = input.getDeductionsOnIncome();
            BigDecimal amount = decOnIncome.multiply(new BigDecimal(times));

            boolean isZero = start.equals(BigDecimal.ZERO);
            double percent = isZero ? 0 : amount.multiply(new BigDecimal(100)).divide(start, 2, RoundingMode.HALF_UP).doubleValue();

            DeductionRow row = new DeductionRow();
            row.setYear(i + 1);
            row.setSalary(start);
            row.setTimes(times);
            row.setPercent(percent);
            row.setAmount(amount);
            rows.add(row);
        }
        return rows;
    }

    public void print(List<DeductionRow> rows) {
        section("b. Deduction Report");

        String format = "%-5s | %16s | %16s | %12s | %16s\n";
        System.out.format(format, "Year", "Starting Salary", "# of Deductions", "Deduction %", "Deduction Amount");

        for (DeductionRow row : rows) {
            System.out.format(format, row.getRepresentation());
        }

    }
}
