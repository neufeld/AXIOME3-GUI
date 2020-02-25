from AXIOME3_app.app import init_celery

app = init_celery()
app.conf.imports = app.conf.imports + ("AXIOME3_app.tasks",)