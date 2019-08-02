package me.cyper.fsd.lab04.report;

import com.google.common.collect.Lists;
import me.cyper.fsd.lab04.model.SalaryInput;
import me.cyper.fsd.lab04.model.report.IncrementRow;

import java.math.BigDecimal;
import java.util.List;

public class IncrementReport extends Report {

    public List<IncrementRow> calculateData(SalaryInput input) {
        List<IncrementRow> rows = Lists.newArrayList();
        for (int i = 0; i < input.getYears(); i++) {

            // increment
            BigDecimal start = input.getStartingSalary();
            if (i > 0) {
                IncrementRow lastRow = rows.get(i - 1);
                start = lastRow.getSalary().add(lastRow.getAmount());
            }

            int times = input.getIncFrequency().getValue();
            double percent = input.getIncInPercent();
            BigDecimal nextStart = new BigDecimal(start.toString());
            for (int j = 0; j < times; j++) {
                nextStart = nextStart.multiply(new BigDecimal(1 + percent / 100));
            }
            BigDecimal amount = nextStart.subtract(start);


            IncrementRow row = new IncrementRow();
            row.setYear(i + 1);
            row.setSalary(start);
            row.setTimes(times);
            row.setPercent(percent);
            row.setAmount(amount);
            rows.add(row);
        }
        return rows;
    }

    public void print(List<IncrementRow> rows) {
        section("a. Increment Report");

        String format = "%-5s | %16s | %16s | %12s | %16s\n";
        System.out.format(format, "Year", "Starting Salary", "# of Increments", "Increment %", "Increment Amount");


        for (IncrementRow row : rows) {
            System.out.format(format, row.getRepresentation());
        }

    }
}
