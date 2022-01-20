---
title: YOLOv5训练自定义数据集
date: 2022-01-20 23:24:03
tags: 炼丹术
---

## YOLOv5训练自定义数据

### 一、开始之前的准备工作

克隆 repo 并在[**Python>=3.6.0**](https://www.python.org/)环境中安装[requirements.txt](https://github.com/ultralytics/yolov5/blob/master/requirements.txt)，包括[**PyTorch>=1.7**](https://pytorch.org/get-started/locally/)。[模型](https://github.com/ultralytics/yolov5/tree/master/models)和[数据](https://github.com/ultralytics/yolov5/tree/master/data)集会从最新的 YOLOv5[版本中](https://github.com/ultralytics/yolov5/releases)自动下载。

```shell
git clone https://github.com/ultralytics/yolov5
cd yolov5
pip install -r requirements.txt
```



### 二、训练自定义数据

#### 2.1 创建my_dataset.yaml

[COCO128](https://www.kaggle.com/ultralytics/coco128)是一个示例小教程数据集，由[COCO](http://cocodataset.org/#home) train2017中的前 128 张图像组成。这些相同的 128 张图像用于训练和验证，以验证我们的训练管道是否能够过拟合。[数据/ coco128.yaml](https://github.com/ultralytics/yolov5/blob/master/data/coco128.yaml)，如下所示，是数据集的配置文件，它定义1）数据集根目录`path`和相对路径`train`/ `val`/`test`图像目录（或* .txt与图像文件的路径），2）的类的数量`nc`和3）类列表`names`：

```yaml
# Train/val/test sets as 1) dir: path/to/imgs, 2) file: path/to/imgs.txt, or 3) list: [path/to/imgs1, path/to/imgs2, ..]
path: ../datasets/coco128  # dataset root dir 数据集根目录
train: images/train2017  # train images (relative to 'path') 128 images #训练图像（相对于“path”）
val: images/train2017  # val images (relative to 'path') 128 images # val 图像（相对于“path”）
test:  # test images (optional) #测试图像（可选）

# Classes
nc: 80  # number of classes
names: [ 'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light',
         'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
         'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee',
         'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard',
         'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple',
         'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch',
         'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone',
         'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear',
         'hair drier', 'toothbrush' ]  # class names
```

这里设置数据集路径有三种方式：

- 1) dir: path/to/imgs, 
- 2) file: path/to/imgs.txt, 或 
- 3) list: [path/to/imgs1, path/to/imgs2, .. ] 



#### 2.2 创建label标签

使用[CVAT](https://github.com/opencv/cvat)或[makeense.ai](https://www.makesense.ai/)等工具标记图像后，将标签导出为**YOLO 格式**，`*.txt`每个图像一个文件（如果图像中没有对象，则不需要`*.txt`文件）。该`*.txt`文件规格有：

- 每个对象一行
- 每一行都是`class x_center y_center width height`格式。
- 框坐标必须采用**标准化 xywh**格式（从 0 - 1）。如果您的箱子以像素为单位，划分`x_center`并`width`通过图像宽度，`y_center`并`height`通过图像高度。
- 类号是零索引的（从 0 开始）。

![](https://img2020.cnblogs.com/blog/1571518/202109/1571518-20210923105201993-1410184774.png)

上图对应的标签文件包含2个人（class 0）和一条领带（class 27）：

![](https://img2020.cnblogs.com/blog/1571518/202109/1571518-20210923105227621-579287813.png)

#### 2.3 整理目录

根据以下示例组织您的训练和验证图像和标签。YOLOv5 假设 `/coco128`在`/datasets`目录**旁边**的`/yolov5`目录中。**YOLOv5**通过将`/images/`每个图像路径中的最后一个实例替换为`/labels/`. 例如：

```file
../datasets/coco128/images/im0.jpg   #图像
../datasets/coco128/labels/im0.txt   #标签
```
文件结构，如下图所示：

![](https://img2020.cnblogs.com/blog/1571518/202109/1571518-20210923105345948-636890929.png)

#### 2.4 选择模型型号

选择一个预训练模型开始训练。这里我们选择[YOLOv5s](https://github.com/ultralytics/yolov5/blob/master/models/yolov5s.yaml)，这是可用的最小和最快的模型。有关所有模型的完整比较，请参阅 README[表](https://github.com/ultralytics/yolov5#pretrained-checkpoints)。

![](https://img2020.cnblogs.com/blog/1571518/202109/1571518-20210923105602866-1013468094.png)

![](https://img2020.cnblogs.com/blog/1571518/202109/1571518-20210923105615221-285667046.png)



#### 2.5 train训练

通过指定数据集、批量大小、图像大小以及预训练`--weights yolov5s.pt`（推荐）或随机初始化`--weights '' --cfg yolov5s.yaml`（不推荐），在 COCO128 上训练 YOLOv5s 模型。预训练权重是从[最新的 YOLOv5 版本](https://github.com/ultralytics/yolov5/releases)自动下载的。

```shell
# 在COCO128 上训练
YOLOv5s 3 epochs $ python train.py --img 640 --batch 16 --epochs 3 --data coco128.yaml --weights yolov5s.pt
```

所有训练结果都保存在`runs/train/`递增的运行目录中，即`runs/train/exp2`，`runs/train/exp3`等。有关更多详细信息，请参阅我们的 Google Colab Notebook 的训练部分。

[![在 Colab 中打开](https://camo.githubusercontent.com/84f0493939e0c4de4e6dbe113251b4bfb5353e57134ffd9fcab6b8714514d4d1/68747470733a2f2f636f6c61622e72657365617263682e676f6f676c652e636f6d2f6173736574732f636f6c61622d62616467652e737667)](https://colab.research.google.com/github/ultralytics/yolov5/blob/master/tutorial.ipynb)

[![在 Kaggle 中打开](https://camo.githubusercontent.com/a08ca511178e691ace596a95d334f73cf4ce06e83a5c4a5169b8bb68cac27bef/68747470733a2f2f6b6167676c652e636f6d2f7374617469632f696d616765732f6f70656e2d696e2d6b6167676c652e737667)](https://www.kaggle.com/ultralytics/yolov5)



### 三、可视化

#### 权重和偏差记录（🚀 新）

[权重和偏差](https://wandb.ai/site?utm_campaign=repo_yolo_traintutorial)(W&B) 现在与 YOLOv5 集成，用于训练运行的实时可视化和云记录。这允许更好地运行比较和内省，以及提高团队成员之间的可见性和协作。要启用 W&B 日志记录，请安装`wandb`，然后正常训练（首次使用时将指导您进行设置）。

```shell
pip install wandb
```

在训练过程期间，你将在[https://wandb.ai](https://wandb.ai/site?utm_campaign=repo_yolo_traintutorial)看到实时更新，并且您可以使用 W&B 报告工具创建结果的[详细报告](https://wandb.ai/glenn-jocher/yolov5_tutorial/reports/YOLOv5-COCO128-Tutorial-Results--VmlldzozMDI5OTY)。

![](https://img2020.cnblogs.com/blog/1571518/202109/1571518-20210923114832118-72834769.png)



### 四、本地日志

所有的结果都在默认情况下记录`runs/train`，为每个新的培训作为创建一个新的实验目录`runs/train/exp2`，`runs/train/exp3`等查看火车和Val JPG文件看马赛克，标签，预测和增强效果。请注意，使用 Ultralytics **Mosaic Dataloader**进行训练（如下所示），它在训练期间将 4 个图像组合成 1 个马赛克。

`train_batch0.jpg` 显示训练批次 0 马赛克和标签：

>   ![](https://img2020.cnblogs.com/blog/1571518/202109/1571518-20210923115145262-1608192963.png)

`val_batch0_labels.jpg` 显示 val 批次 0 标签：

>  ![](https://img2020.cnblogs.com/blog/1571518/202109/1571518-20210923115245233-2135381433.png)

`val_batch0_pred.jpg`显示 val 批次 0*预测*：

> ![](https://img2020.cnblogs.com/blog/1571518/202109/1571518-20210923115356355-1086532063.png)

训练结果自动记录到[Tensorboard](https://www.tensorflow.org/tensorboard)和[CSV](https://github.com/ultralytics/yolov5/pull/4148)中`results.csv`，`results.png`训练完成后绘制为（下图）。您还可以`results.csv`手动绘制任何文件：

```shell
from utils.plots import plot_results 
plot_results('path/to/results.csv')  # plot 'results.csv' as 'results.png'
```
![](https://img2020.cnblogs.com/blog/1571518/202109/1571518-20210923115501205-136492916.png)