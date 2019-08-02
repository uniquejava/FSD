package me.cyper.fsd.lab04.utils;

import me.cyper.fsd.lab04.model.SalaryInput;
import me.cyper.fsd.lab04.model.report.DeductionRow;
import me.cyper.fsd.lab04.model.report.IncrementRow;
import me.cyper.fsd.lab04.model.report.PredictionRow;
import me.cyper.fsd.lab04.report.DeductionReport;
import me.cyper.fsd.lab04.report.IncrementReport;
import me.cyper.fsd.lab04.report.PredictionReport;

import java.util.List;

public class ReportGenerator {
    private SalaryInput input;

    public ReportGenerator(SalaryInput input) {
        this.input = input;
    }

    public void buildReport() {
        IncrementReport report = new IncrementReport();
        List<IncrementRow> incrementData = report.calculateData(input);
        report.print(incrementData);

        DeductionReport deductionReport = new DeductionReport();
        List<DeductionRow> deductionData = deductionReport.calculateData(input);
        deductionReport.print(deductionData);


        PredictionReport predictionReport = new PredictionReport();
        List<PredictionRow> predictionData = predictionReport.calculateData(incrementData, deductionData);
        predictionReport.print(predictionData);
    }


}
