import FraSimMulCNforPython
import matlab
import sys
# def FraSim(sigma_H, sigma_h, E, nu, Kfluid, Nfluid, CLoss, Q0, H, HfNum, DistFra, sectionStart, sectionEnd, DenArea, AziAngle, AveLen, cprop, Tpad, Tprop, Dt, Dl, NFScope, filedir):
# print(map(float, sys.argv[11].split(',')))
sigma_H = float(sys.argv[1])
sigma_h = float(sys.argv[2])
E = float(sys.argv[3])
nu = float(sys.argv[4])
Kfluid = float(sys.argv[5])
Nfluid = float(sys.argv[6])
CLoss = float(sys.argv[7])
Q0 = float(sys.argv[8])
H = float(sys.argv[9])
HfNum = float(sys.argv[10])
DistFra = matlab.double(map(float, sys.argv[11].split(',')))
sectionStart = float(sys.argv[12])
sectionEnd = float(sys.argv[13])
DenArea = float(sys.argv[14])
AziAngle = float(sys.argv[15])
AveLen = float(sys.argv[16])
cprop = float(sys.argv[17])
Tpad = float(sys.argv[18])
Tprop = float(sys.argv[19])
Dt = float(sys.argv[20])
Dl = float(sys.argv[21])
NFScope = float(sys.argv[22])
filedir = sys.argv[23]
a = FraSimMulCNforPython.initialize()
a.FraSimMulCNforPython(sigma_H, sigma_h, E, nu, Kfluid, Nfluid, CLoss, Q0, H, HfNum, DistFra,
                       sectionStart, sectionEnd, DenArea, AziAngle, AveLen, cprop, Tpad, Tprop, Dt, Dl, NFScope, filedir,nargout = 0)
print(1)
# a.FraSimMulCNforPython(6.024289E+07,5.634403E+07,4.163698E+10,0.17,0.002,1.0,1E-06,14.0,30.0,3.0,data_list,3461.0,3532.625,0.07,30.0,10.0,0.06875,83.33334,83.33334,1000.0,11.0,400.0,"D:\\Projects\\UFracCsharp\\UFrac\\WindowsFormsApp1\\bin\\Debug\\Simulation\\39f5390a-79b6-dea4-1aac-fa2db62e915d\\",nargout=0)
#6.024289E+07 5.634403E+07 4.163698E+10 0.17 0.002 1.0 1E-06 14.0 30.0 3.0 3450,3460,3500 3461.0 3532.625 0.07 30.0 10.0 0.06875                        83.33334 83.33334 1000.0 11.0 400.0 "D:\\Projects\\UFracCsharp\\UFrac\\WindowsFormsApp1\\bin\\Debug\\Simulation\\39f5390a-79b6-dea4-1aac-fa2db62e915d\\
#584300000 547800000 530214000000 3 0.17 0.41 0.000001 12 40 8 4105.25,4095.13,4115.25,4137.38,4127,4153,4174.88,4164.13 4094.63 4174.88 0.0001 30 10 0 83.33333333333333 83.33333333333333 1000 6 200 d:\Projects\UfracAPI\fractureResults\3\