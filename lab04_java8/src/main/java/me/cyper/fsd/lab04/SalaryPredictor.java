package me.cyper.fsd.lab04;

import me.cyper.fsd.lab04.model.SalaryInput;
import me.cyper.fsd.lab04.utils.SalaryInputBuilder;

/**
 * Salary Income Predictor.
 */
public class SalaryPredictor {
    public static void main(String[] args) {
        section("Salary Income Predictor");

        SalaryInput input = new SalaryInputBuilder()
                .collectStartingSalary()
                .collectIncrementInPercent()
                .collectIncrementFrequency()
                .collectDeductionsOnIncome()
                .collectDeductionsFrequency()
                .collectPredictionYears()
                .build();


        section("Input parameters");
        System.out.println(input);
    }

    private static void section(String title) {
        System.out.println();
        System.out.println(title);
        System.out.println("=================================================");
        System.out.println();
    }
}
