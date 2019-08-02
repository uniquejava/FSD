package me.cyper.fsd.lab04.report;

import com.google.common.collect.Lists;
import me.cyper.fsd.lab04.model.report.DeductionRow;
import me.cyper.fsd.lab04.model.report.IncrementRow;
import me.cyper.fsd.lab04.model.report.PredictionRow;

import java.math.BigDecimal;
import java.util.List;

public class PredictionReport extends Report {

    public List<PredictionRow> calculateData(List<IncrementRow> incrementRows, List<DeductionRow> deductionRows) {

        List<PredictionRow> rows = Lists.newArrayList();

        for (int i = 0; i < incrementRows.size(); i++) {
            IncrementRow incRow = incrementRows.get(i);
            DeductionRow decRow = deductionRows.get(i);

            BigDecimal start = incRow.getSalary();
            if (i > 0) {
                PredictionRow lastRow = rows.get(i - 1);
                start = lastRow.getSalary().add(lastRow.getSalaryGrowth());
            }

            PredictionRow predictionRow = new PredictionRow();
            predictionRow.setYear(incRow.getYear());
            predictionRow.setSalary(start);
            predictionRow.setIncrementAmount(incRow.getAmount());
            predictionRow.setDeductionAmount(decRow.getAmount());
            predictionRow.setSalaryGrowth(incRow.getAmount().subtract(decRow.getAmount()));
            rows.add(predictionRow);

            boolean noMoreSalary = predictionRow.getSalary().add(predictionRow.getSalaryGrowth()).compareTo(BigDecimal.ZERO) <= 0;
            if (i != incrementRows.size() - 1 && noMoreSalary) {
                PredictionRow endRow = new PredictionRow();
                endRow.setYear(incRow.getYear() + 1);
                endRow.setSalary(BigDecimal.ZERO);
                endRow.setIncrementAmount(BigDecimal.ZERO);
                endRow.setDeductionAmount(BigDecimal.ZERO);
                endRow.setSalaryGrowth(BigDecimal.ZERO);
                rows.add(endRow);
                break;
            }

        }
        return rows;
    }

    public void print(List<PredictionRow> rows) {
        section("c. Prediction");

        String format = "%-5s | %16s | %16s | %16s | %16s\n";
        System.out.format(format, "Year", "Starting Salary", "Increment Amount", "Deduction Amount", "Salary Growth");


        for (PredictionRow row : rows) {
            System.out.format(format, row.getRepresentation());
        }

    }
}
