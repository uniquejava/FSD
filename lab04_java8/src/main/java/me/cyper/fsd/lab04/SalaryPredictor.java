package me.cyper.fsd.lab04;

import me.cyper.fsd.lab04.model.SalaryInput;
import me.cyper.fsd.lab04.utils.ReportGenerator;
import me.cyper.fsd.lab04.utils.SalaryInputBuilder;

/**
 * Salary Income Predictor.
 */
public class SalaryPredictor {

    public SalaryPredictor() {
        System.out.println();
        System.out.println("Salary Income Predictor");
        System.out.println("=================================================");
        System.out.println();
    }

    public SalaryInput getInputFromTerminal() {
        return new SalaryInputBuilder()
                .collectStartingSalary()
                .collectIncrementInPercent()
                .collectIncrementFrequency()
                .collectDeductionsOnIncome()
                .collectDeductionsFrequency()
                .collectPredictionYears()
                .build();
    }

    public void predict(SalaryInput input) {
        new ReportGenerator(input).buildReport();
    }

    public static void main(String[] args) {
        SalaryPredictor predictor = new SalaryPredictor();
        SalaryInput input = predictor.getInputFromTerminal();

        predictor.predict(input);
    }



}
