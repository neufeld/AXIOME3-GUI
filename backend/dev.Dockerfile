FROM continuumio/miniconda3

ARG QIIME2_RELEASE

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
RUN git clone --single-branch --branch web-app https://github.com/neufeld/AXIOME3.git

#WORKDIR /pipeline/AXIOME3
# Train QIIME2 classifier (138 version)
# Get ref-seqs
#RUN wget https://data.qiime2.org/2020.6/common/silva-138-99-seqs.qza
# Get taxonomy
#RUN wget https://data.qiime2.org/2020.6/common/silva-138-99-tax.qza
# Extract V4V5 region
#RUN qiime feature-classifier extract-reads --i-sequences silva-138-99-seqs.qza --p-f-primer GTGYCAGCMGCCGCGGTAA --p-r-primer CCGYCAATTYMTTTRAGTTT --o-reads ref_seqs_silva138_NR99_V4V5.qza
# Train classifier
#RUN qiime feature-classifier fit-classifier-naive-bayes --i-reference-reads ref_seqs_silva138_NR99_V4V5.qza --i-reference-taxonomy silva-138-99-tax.qza --o-classifier classifier_silva138_NR99_V4V5.qza

# Make /backend working directory; flask code lives here
WORKDIR /backend
# Install biopython
#RUN conda install -c conda-forge biopython

# Install from requirements.txt using pip
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN rm requirements.txt

#CMD ["flask", "run", "--host", "0.0.0.0"]