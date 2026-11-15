program calculate_average
    implicit none

    real :: num1, num2, num3
    real :: average

    num1 = 10.0
    num2 = 20.0
    num3 = 30.0

    average = (num1 + num2 + num3) / 3.0

    print *, "Average:", average

end program calculate_average
