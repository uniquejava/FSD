# Salary Income Predictor

## Tech stack

1. java8 stream api
2. java enum
3. builder pattern

## Setup

```sh
git clone https://github.com/uniquejava/FSD.git
cd FSD/lab04_java8
mvn clean package
java -cp ./target/*.jar me.cyper.fsd.lab04.SalaryPredictor
```

java8 stream api only used here: `me.cyper.fsd.lab04.model.Frequency.getValues`

## Sample output

```sh
$ java -cp ./target/*.jar me.cyper.fsd.lab04.SalaryPredictor

Salary Income Predictor
=================================================

Input starting salary: 2000.55
Input increment in percent: 10.25
Input increment received frequency: 2
Input deductions on income: 666.77
Input deductions received frequency: 2
Input prediction years: 5

--------------------------------------------------------------
a. Increment Report

Year  |  Starting Salary |  # of Increments |  Increment % | Increment Amount
1     |          2000.55 |                2 |        10.25 |           431.13
2     |          2431.68 |                2 |        10.25 |           524.04
3     |          2955.72 |                2 |        10.25 |           636.98
4     |           3592.7 |                2 |        10.25 |           774.25
5     |          4366.95 |                2 |        10.25 |            941.1

--------------------------------------------------------------
b. Deduction Report

Year  |  Starting Salary |  # of Deductions |  Deduction % | Deduction Amount
1     |          2000.55 |                2 |        66.66 |          1333.54
2     |           667.01 |                2 |       199.93 |          1333.54
3     |          -666.53 |                2 |      -200.07 |          1333.54
4     |         -2000.07 |                2 |       -66.67 |          1333.54
5     |         -3333.61 |                2 |        -40.0 |          1333.54

--------------------------------------------------------------
c. Prediction

Year  |  Starting Salary | Increment Amount | Deduction Amount |    Salary Growth
1     |          2000.55 |           431.13 |          1333.54 |          -902.41
2     |          1098.14 |           524.04 |          1333.54 |           -809.5
3     |           288.64 |           636.98 |          1333.54 |          -696.56
4     |              0.0 |              0.0 |              0.0 |              0.0
```

## References
