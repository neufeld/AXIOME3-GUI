ARG QIIME2_RELEASE

FROM qiime2/core:${QIIME2_RELEASE}

ARG CLASSIFIER_GDRIVE_ID

# Make /backend working directory; flask code lives here
WORKDIR /backend

# Install from requirements.txt using pip
COPY requirements.txt requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt && pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib oauth2client
RUN rm requirements.txt

# wget classifier
WORKDIR /pipeline
#RUN gdown https://drive.google.com/uc?id=${CLASSIFIER_GDRIVE_ID}

# Install ms-core-fonts to use Arial font
# Add contrib repo
RUN sed -i'.bak' 's/$/ contrib non-free/' /etc/apt/sources.list
# Accept EULA
RUN echo ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true | debconf-set-selections
# Remove matplotlib cache dir
RUN rm ~/.cache/matplotlib -fr
# Install ms-core-font
RUN apt-get update --allow-releaseinfo-change
RUN fc-cache -f -v

# Change workdir back to /backend (so the flask app can be run)
WORKDIR /backend

#CMD ["flask", "run", "--host", "0.0.0.0"]