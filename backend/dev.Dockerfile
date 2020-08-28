FROM continuumio/miniconda3

ARG QIIME2_RELEASE
ARG CLASSIFIER_GDRIVE_ID

RUN apt-get install wget

# Install QIIME2
ENV PATH /opt/conda/envs/qiime2-${QIIME2_RELEASE}/bin:$PATH
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8
ENV MPLBACKEND agg
ENV HOME /home/qiime2
ENV XDG_CONFIG_HOME /home/qiime2

RUN mkdir /home/qiime2
WORKDIR /home/qiime2

RUN conda update -q -y conda
RUN conda install -q -y wget
RUN wget https://data.qiime2.org/distro/core/qiime2-${QIIME2_RELEASE}-py36-linux-conda.yml
RUN conda env create -n qiime2-${QIIME2_RELEASE} --file qiime2-${QIIME2_RELEASE}-py36-linux-conda.yml
RUN rm qiime2-${QIIME2_RELEASE}-py36-linux-conda.yml
RUN /bin/bash -c "source activate qiime2-${QIIME2_RELEASE}"
RUN qiime dev refresh-cache
RUN echo "source activate qiime2-${QIIME2_RELEASE}" >> $HOME/.bashrc
RUN echo "source tab-qiime" >> $HOME/.bashrc

# Make directory to store pipeline
WORKDIR /pipeline
# clone AXIOME3 Pipeline repository
RUN git clone --single-branch --branch dev https://github.com/neufeld/AXIOME3.git

# Make /backend working directory; flask code lives here
WORKDIR /backend

# Install from requirements.txt using pip
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN rm requirements.txt

# wget classifier
WORKDIR /pipeline/AXIOME3
RUN gdown https://drive.google.com/uc?id=${CLASSIFIER_GDRIVE_ID}

# Change workdir back to /backend (so the flask app can be run)
WORKDIR /backend

#CMD ["flask", "run", "--host", "0.0.0.0"]