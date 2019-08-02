package me.cyper.fsd.lab04.utils;

import me.cyper.fsd.lab04.model.Frequency;
import me.cyper.fsd.lab04.model.SalaryInput;

import java.math.BigDecimal;
import java.util.Scanner;

public class SalaryInputBuilder extends SalaryInput {
    private Scanner scanner;

    public SalaryInputBuilder() {
        scanner = new Scanner(System.in);
    }

    private String read(String message) {
        System.out.print(message);
        return scanner.nextLine();
    }

    public SalaryInputBuilder collectStartingSalary() {
        String input = read("Input starting salary: ");
        try {
            BigDecimal result = new BigDecimal(input);
            if (result.compareTo(BigDecimal.ONE) >= 0) {
                this.setStartingSalary(result);
                return this;

            } else {
                System.err.println("Starting salary cannot be less than 1.");
                return this.collectStartingSalary();
            }

        } catch (Exception ex) {
            System.err.println("Input must be a double value.");
            return this.collectStartingSalary();
        }


    }

    public SalaryInputBuilder collectIncrementInPercent() {
        String input = read("Input increment in percent: ");
        try {
            double result = Double.parseDouble(input);

            if (result >= 0) {
                this.setIncInPercent(result);

                return this;

            } else {
                System.err.println("Increment in percent cannot be less than 0.");
                return this.collectStartingSalary();
            }

        } catch (Exception ex) {
            System.err.println("Input must be a number.");
            return this.collectIncrementInPercent();
        }

    }

    public SalaryInputBuilder collectIncrementFrequency() {
        String input = read("Input increment received frequency: ");
        try {
            Frequency frequency = Frequency.valueOf(Integer.valueOf(input));
            this.setIncFrequency(frequency);
            return this;

        } catch (Exception e) {
            System.err.print("Frequency must be one of the following values:");
            System.err.println(Frequency.getValues());
            return this.collectIncrementFrequency();
        }
    }

    public SalaryInputBuilder collectDeductionsOnIncome() {
        String input = read("Input deductions on income: ");
        try {
            BigDecimal result = new BigDecimal(input);

            if (result.compareTo(BigDecimal.ZERO) >=0 ) {
                this.setDeductionsOnIncome(result);

                return this;

            } else {
                System.err.println("Deductions on income cannot be less than 0.");
                return this.collectDeductionsOnIncome();
            }

        } catch (Exception ex) {
            System.err.println("Input must be a number.");
            return this.collectDeductionsOnIncome();
        }

    }

    public SalaryInputBuilder collectDeductionsFrequency() {
        String input = read("Input deductions received frequency: ");

        try {
            Frequency frequency = Frequency.valueOf(Integer.valueOf(input));
            this.setDecFrequency(frequency);
            return this;

        } catch (Exception e) {
            System.err.print("Frequency must be one of the following values:");
            System.err.println(Frequency.getValues());
            return this.collectDeductionsFrequency();
        }
    }

    public SalaryInputBuilder collectPredictionYears() {
        String input = read("Input prediction years: ");
        try {
            int result = Integer.valueOf(input);
            if (result > 0) {
                this.setYears(result);
                return this;

            } else {
                System.err.println("Prediction years must be greater than 0.");
                return this.collectPredictionYears();
            }

        } catch (Exception e) {
            System.err.println("Input must be an integer.");
            return this.collectPredictionYears();
        }
    }


    public SalaryInput build() {
        return (SalaryInput) this;
    }

}
