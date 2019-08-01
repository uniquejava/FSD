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

## Sample output

```sh
$ java -cp ./target/*.jar me.cyper.fsd.lab04.SalaryPredictor

Salary Income Predictor
=================================================

Input starting salary: 1500
Input increment in percent: 20
Input increment received frequency: 2
Input deductions on income: 200
Input deductions received frequency: 1
Input prediction years: 3

Input parameters
=================================================

SalaryInput{startingSalary=1500, incInPercent=20, incFrequency=HALF_YEARLY, decAmount=200, decFrequency=ANNUALLY, years=3}
```

## References
