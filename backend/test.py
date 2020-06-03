import subprocess

cmd = ["python", "/pipeline/AXIOME3/pipeline.py", "Generate_Combined_Feature_Table", "--local-scheduler"]
proc = subprocess.Popen(
	cmd,
	stdout=subprocess.PIPE,
	stderr=subprocess.PIPE
)
	
stdout, stderr = proc.communicate()

print(stdout)