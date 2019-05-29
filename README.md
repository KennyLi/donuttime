# 𝓭𝓸𝓷𝓾𝓽 𝓽𝓲𝓶𝓮  🍩
Kenny Li(PM), Jiayang Chen, Dennis Chen, Johnson Li

P #05: Fin

# Donut Drawing
## Description
Donut Drawing is a layer-based web drawing program similiar to [Aggie.io](https://aggie.io/) or Adobe Photoshop. Users will have several tools such as pencil, paintbrush, paint bucket, eraser, smudge, eye dropper, ellipse, rectangle, and crop. Modifiers can be applied to these tools such as color, brush size, opacity, and brightness. Filters can also be applied to the canvas directly. Users may save their work by making an account and storing it or downloading it locally to their computer.

## Launch Codes
### Requirements
Our dependencies, as listed in requirements.txt, are as follows:

| Dependency | Version | Origin | Description | 
| --- | --- | --- | --- |
| Click | 7.0 | Flask | unused |
| Flask | 1.0.2 | Flask | microframework of choice |
| itsdangerous | 1.1.0 | Flask | unused |
| Jinja2 | 2.10 | Flask | templating language |
| MarkupSafe | 1.1.1 | Flask | unused |
| Werkzeug | 0.15.1 | Flask | unused |

Install our dependencies with the follow command in the root directory of our repo:
```pip3 install -r requirements.txt```

### Install and run on localhost
1. Clone the repo via ssh or https
   - SSH: ```git clone git@github.com:lli15/donut_time.git```
   - HTTPS: ```git clone https://github.com/lli15/donut_time.git```
2. **(Optional)** Make and activate virtual environment
```
python3 -m venv <venv_name>
. <path-to-venv>/bin/activate
```
3. Enter the repo directory
```
cd <path-to-repo>
```
4. Install requirements
   - Python 3.7: ```pip3 install -r requirements.txt```
   - If in virtual environment with Python 3.7: ```pip install -r requirements.txt```
5. Run app.py
   - Python 3.7: ```python3 app.py```
   - If in virtual environment with Python 3.7: ```python app.py```
6. Go to http://127.0.0.1:5000/ on any browser
