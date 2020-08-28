import Simple_Fracture_function_python
import matlab
import sys

savePath = sys.argv[1]
elemsPath = sys.argv[2]
nodesPath = sys.argv[3]
print(elemsPath)
print(nodesPath)
a = Simple_Fracture_function_python.initialize()
a.Simple_Fracture_function_python(savePath, 10.0, 10.0, 3.0, 250.0, 250.0, 30.0, elemsPath, nodesPath, nargout = 0)
print(1)

#Simple_Fracture_function("test", 10.0, 10.0, 3.0, 250.0, 250.0, 30.0, [[1.0, 2.0], [30.0, 31.0], [59.0, 60.0]], [[1.0, 2.0], [30.0, 31.0], [59.0, 60.0]], nargout = 0)