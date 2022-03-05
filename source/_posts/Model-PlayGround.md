---
title: Model_PlayGround
date: 2022-03-05 16:25:06
tags: Model
categories: 算法实验
---

# 可视化经典模型的对比实验总结

---

## 环境安装

### 安装OpenGL

```shell
sudo apt-get install -y build-essential  libxmu-dev libgl1-mesa-glx libglu1-mesa-dev libgl1-mesa-dev freeglut3-dev libglew-dev libsdl2-dev libsdl2-image-dev libglm-dev libfreetype6-dev
```



### 安装Netron

网页版：https://netron.app/
官方下载：https://github.com/lutzroeder/netron

![](Model-PlayGround/1571518-20220305162352499-1591018073.png)


### 安装zetane

官方链接“”https://zetane.com/
GitHub链接：https://github.com/zetane/viewer

![](Model-PlayGround/1571518-20220305162248318-2047619956.png)



## AlexNet

Alexnet 是一个图像分类模型，其中输入是 1000 个不同类别（例如猫、狗等）之一的图像，输出是 1000 个数字的向量。
输出向量的第i个元素是输入图像属于第i类的概率；因此，输出向量的所有元素之和为 1。
AlexNet 的输入是大小为 224x224 像素的 RGB 图像。

模型设计图

![](Model-PlayGround/1571518-20220225145203604-1693667163.png)



Netron结构图

![](Model-PlayGround/1571518-20220225140315239-1252251100.png)


![](Model-PlayGround/1571518-20220225141625919-478564144.png)


![](Model-PlayGround/1571518-20220225141939074-1964146127.png)

weights

![](Model-PlayGround/1571518-20220225142000979-1208083108.png)

bias

![](Model-PlayGround/1571518-20220225142035006-104454797.png)

input (1,3,224,224)

![](Model-PlayGround/1571518-20220225140516780-477155284.png)


![](Model-PlayGround/1571518-20220225141720885-482648097.png)

Conv

![](Model-PlayGround/1571518-20220225141904046-443173747.png)

Feature Maps
![](Model-PlayGround/1571518-20220225142131191-1941806955.png)

ReLU

![](Model-PlayGround/1571518-20220225142609149-973728261.png)

MaxPool

![](Model-PlayGround/1571518-20220225142756207-1018614640.png)

![](Model-PlayGround/1571518-20220225142834485-331509093.png)



整体结构图

![](Model-PlayGround/1571518-20220225143409901-468288485.png)

feature0

![](Model-PlayGround/1571518-20220225143636108-341920803.png)

feature3

![](Model-PlayGround/1571518-20220225143740378-1592067968.png)

feature6

![](Model-PlayGround/1571518-20220225143856590-1693357601.png)

feature8

![](Model-PlayGround/1571518-20220225143934716-1747820310.png)

feature10

![](Model-PlayGround/1571518-20220225144020506-1695211690.png)

![](Model-PlayGround/1571518-20220225144059763-138027249.png)

classify

![](Model-PlayGround/1571518-20220225144237338-1898633771.png)


## VGG

模型设计图

![](Model-PlayGround/1571518-20220225145046001-1458327826.png)

Netron结构图

![](Model-PlayGround/1571518-20220225150537049-891493968.png)

整体结构图

![](Model-PlayGround/1571518-20220225152559322-1149730495.png)

feature0

![](Model-PlayGround/1571518-20220225152750409-187000821.png)

feature2

![](Model-PlayGround/1571518-20220225152941281-1204442755.png)

feature5

![](Model-PlayGround/1571518-20220225153132935-1871481424.png)

feature7

![](Model-PlayGround/1571518-20220225153259364-1250930943.png)

feature10

![](Model-PlayGround/1571518-20220225153348113-302309405.png)

feature12

![](Model-PlayGround/1571518-20220225153448549-640621181.png)

feature14

![](Model-PlayGround/1571518-20220225153539550-1806783753.png)

feature17

![](Model-PlayGround/1571518-20220225153629625-1468152986.png)

feature19

![](Model-PlayGround/1571518-20220225153720713-877509722.png)

feature21

![](Model-PlayGround/1571518-20220225160526229-1428599420.png)


feature24

![](Model-PlayGround/1571518-20220225160748772-21524161.png)

feature26

![](Model-PlayGround/1571518-20220225160836318-841285763.png)

feature28

![](Model-PlayGround/1571518-20220225162311365-98380387.png)


classifier

![](Model-PlayGround/1571518-20220225162355145-1901323229.png)


## GoogleNet
模型设计图

![](Model-PlayGround/1571518-20220225163302824-1362493528.png)

![](Model-PlayGround/1571518-20220225163312657-1912740755.png)

Netron网络图

![](Model-PlayGround/1571518-20220225163511480-1300588968.png)

zetane整体结构图
![](Model-PlayGround/1571518-20220225163816353-215415042.png)


详细可视化
1

![](Model-PlayGround/1571518-20220225164027522-1510122691.png)

2

![](Model-PlayGround/1571518-20220225164245123-1068736293.png)

3
![](Model-PlayGround/1571518-20220225164437341-1049144409.png)

分支

![](Model-PlayGround/1571518-20220225165506711-848751439.png)

m_1

![](Model-PlayGround/1571518-20220225164621508-1358903517.png)

m_2

![](Model-PlayGround/1571518-20220225164708591-1897267092.png)

m_3

![](Model-PlayGround/1571518-20220225164803107-1594251840.png)

m_4

![](Model-PlayGround/1571518-20220225164847846-254496265.png)

for_epoch 9次
![](Model-PlayGround/1571518-20220225165802140-1803925215.png)


output_merge

![](Model-PlayGround/1571518-20220225165057783-43982196.png)

end

![](Model-PlayGround/1571518-20220225165201855-291482507.png)



## Inception_v3

也称为 GoogleNetv3，2015 年开始在 Imagenet 上训练的著名 ConvNet。

模型设计图

![](Model-PlayGround/1571518-20220225170441225-1444254505.png)

Netron结构图

![](Model-PlayGround/1571518-20220225171828164-1619770749.png)

zetane整体结构图

![](Model-PlayGround/1571518-20220225172157106-916922756.png)

conv

![](Model-PlayGround/1571518-20220228105357984-1173663008.png)


![](Model-PlayGround/1571518-20220228105509847-564145604.png)


![](Model-PlayGround/1571518-20220228105632743-1014896237.png)


![](Model-PlayGround/1571518-20220228105715764-994351996.png)


![](Model-PlayGround/1571518-20220228105824822-141628719.png)


分支

![](Model-PlayGround/1571518-20220228105917475-1909633004.png)

m_1

![](Model-PlayGround/1571518-20220228110017466-411973851.png)

m_2

![](Model-PlayGround/1571518-20220228110059059-648280204.png)

m_3

![](Model-PlayGround/1571518-20220228110546231-2034790858.png)

m_4

![](Model-PlayGround/1571518-20220228110609834-1005388752.png)



![](Model-PlayGround/1571518-20220228110655723-930615372.png)



![](Model-PlayGround/1571518-20220228110724170-1612694160.png)



![](Model-PlayGround/1571518-20220228110800529-589118568.png)



![](Model-PlayGround/1571518-20220228110820825-1761940179.png)



![](Model-PlayGround/1571518-20220228110855861-531054803.png)



![](Model-PlayGround/1571518-20220228110935025-418365837.png)



![](Model-PlayGround/1571518-20220228111043287-708269569.png)

全局图

![](Model-PlayGround/1571518-20220228114216656-219182460.png)





## DenseNet

密集卷积网络（DenseNet）以前馈方式将每一层连接到其他每一层。

网络设计图

![](Model-PlayGround/1571518-20220228115120387-933369143.png)

![](Model-PlayGround/1571518-20220228115127046-647785944.png)


Netron网络图

![](Model-PlayGround/1571518-20220228153703321-1269014383.png)

这个部分可以看做是一个基础组件的结构，后面大量嵌套并循环使用
![](Model-PlayGround/1571518-20220228165814936-588490293.png)

局部图
![](Model-PlayGround/1571518-20220228165820358-1673461436.png)

第一部分

![](Model-PlayGround/1571518-20220228170026670-92347754.png)

第二部分

![](Model-PlayGround/1571518-20220228170144694-1084057811.png)

第三部分-头

![](Model-PlayGround/1571518-20220228170500118-2068008562.png)


第三部分-尾

![](Model-PlayGround/1571518-20220228170505684-1699916486.png)


第四部分 

![](Model-PlayGround/1571518-20220228170553452-1448792945.png)



zetane网络图

![](Model-PlayGround/1571518-20220228174721633-1978608516.png)

![](Model-PlayGround/1571518-20220228174820241-19661652.png)

![](Model-PlayGround/1571518-20220228174829836-1146331656.png)

![](Model-PlayGround/1571518-20220228174835976-1789254247.png)




## SqueezeNet

参数减少 50 倍的 Alexnet 级精度。

网络设计图

![](Model-PlayGround/1571518-20220228203721301-183649768.png)

Netron网络图

![](Model-PlayGround/1571518-20220228203814545-1020463711.png)

Zetene整体图

![](Model-PlayGround/1571518-20220228204053197-2025424060.png)

细节

features.0 

![](Model-PlayGround/1571518-20220228204603726-1521186485.png)

features.3.squeeze

![](Model-PlayGround/1571518-20220228205445501-2130145544.png)

features.3.expand3x3

![](Model-PlayGround/1571518-20220301090947542-723517316.png)

features.4

![](Model-PlayGround/1571518-20220301091037116-1887713548.png)

features.4.expand1x1

![](Model-PlayGround/1571518-20220301091458576-108253404.png)

features.5.squeeze

![](Model-PlayGround/1571518-20220301091653726-1473094623.png)

features.5.expand3x3

![](Model-PlayGround/1571518-20220301091808363-262417800.png)

features.7.squeeze

![](Model-PlayGround/1571518-20220301091910881-216017219.png)


features.7.expand 

![](Model-PlayGround/1571518-20220301092610963-360997827.png)


features.8.squeeze

![](Model-PlayGround/1571518-20220301092706685-449851702.png)


features.8.expand 

![](Model-PlayGround/1571518-20220301092753515-269603352.png)


features.9.squeeze

![](Model-PlayGround/1571518-20220301092853535-1453649827.png)


features.10.expand

![](Model-PlayGround/1571518-20220301092955198-271839240.png)


features.10.squeeze

![](Model-PlayGround/1571518-20220301093047107-867498964.png)


features.10.expand1x1

![](Model-PlayGround/1571518-20220301093208817-1347431653.png)


features.12.squeeze

![](Model-PlayGround/1571518-20220301093321486-1887295047.png)


features.12.expand.3x3

![](Model-PlayGround/1571518-20220301093648575-957121320.png)

classifer.1

![](Model-PlayGround/1571518-20220301094639842-1748417057.png)


全局图


![](Model-PlayGround/1571518-20220301094840108-387938584.png)


output

![](Model-PlayGround/1571518-20220301095022112-1958225398.png)



## ShuffleNet

一个针对速度和内存进行了优化的高效 ConvNet，在 Imagenet 上进行了预训练。

所有预训练模型都期望输入图像以相同的方式归一化，即形状为 的 3 通道 RGB 图像的小批量`(3 x H x W)`，其中`H`和`W`预计至少为`224`。必须将图像加载到 的范围内，然后使用 和`[0, 1]`进行归一化。`mean = [0.485, 0.456, 0.406]``std = [0.229, 0.224, 0.225]。

网络设计图

![](Model-PlayGround/1571518-20220301154747781-434373750.png)

![](Model-PlayGround/1571518-20220301154753666-1022040968.png)


Netron网络图

![](Model-PlayGround/1571518-20220301160822766-236083582.png)

Zetane整体图

![](Model-PlayGround/1571518-20220301160951118-740286363.png)

p1

![](Model-PlayGround/1571518-20220301161228919-1274638524.png)

这里同样可以将几个重复的结构作为单独模块来理解分析，大致可分为两个组件和一个连接件。

组件一：包含两个输出层，输出层一包含三个Conv卷积和两个ReLu，输出层二包含两个Conv卷积和一个ReLu。

![](Model-PlayGround/1571518-20220301161740668-1364149764.png)


组件二：包含两个输出层，输出层一无其他操作直接输出，输出层二包含三个Conv卷积和两个ReLu。

![](Model-PlayGround/1571518-20220301161852527-1338204606.png)

连接件：这部分主要是用来连接组件模块设计的，包含Constant、Concat、Transpose、Reshape、Split。

![](Model-PlayGround/1571518-20220301162001255-274904922.png)


先来预览下组件模块的效果

组件一

![](Model-PlayGround/1571518-20220301162211491-950958721.png)

组件二

![](Model-PlayGround/1571518-20220301162249016-216836367.png)

连接件：

concat

![](Model-PlayGround/1571518-20220301163617583-361559307.png)

input_1 (24,28,28)

![](Model-PlayGround/1571518-20220301163322827-713482907.png)

input_2 (24,28,28)

![](Model-PlayGround/1571518-20220301163402051-1585287036.png)

output (48,28,28)

![](Model-PlayGround/1571518-20220301163449137-30117470.png)

Constant

![](Model-PlayGround/1571518-20220301163738944-698473299.png)

Reshape

![](Model-PlayGround/1571518-20220301163833650-1901190548.png)

Transpose

![](Model-PlayGround/1571518-20220301164658138-1571132414.png)

Split

input (48,28,28)

![](Model-PlayGround/1571518-20220301164919027-1068410671.png)

output_1 (24,28,28)

![](Model-PlayGround/1571518-20220301165002776-347972027.png)

output_2 (24,28,28)

![](Model-PlayGround/1571518-20220301165119464-538866478.png)

模型组网

组网方式一

![](Model-PlayGround/1571518-20220301165504155-1361769752.png)

组网方式二

![](Model-PlayGround/1571518-20220301165526279-524827084.png)


end

![](Model-PlayGround/1571518-20220301165346065-1267305526.png)


## ResNet


在 ImageNet 上预训练的深度残差网络

网络设计图

![](Model-PlayGround/1571518-20220228180734045-2069384407.png)



Netron网络图

![](Model-PlayGround/1571518-20220228180902400-860347899.png)


Zetane整体图

![](Model-PlayGround/1571518-20220228181119496-1007069512.png)

局部细节

p1

![](Model-PlayGround/1571518-20220228181337402-1725386448.png)

p2

![](Model-PlayGround/1571518-20220228181421463-717846787.png)

p3

![](Model-PlayGround/1571518-20220228182015625-1377034284.png)

p4

![](Model-PlayGround/1571518-20220228182059442-801591851.png)

p5

![](Model-PlayGround/1571518-20220228182154960-1947470775.png)

p6

![](Model-PlayGround/1571518-20220228182235419-927467848.png)

p7

![](Model-PlayGround/1571518-20220228182319768-706186423.png)


p8

![](Model-PlayGround/1571518-20220228182403517-657090797.png)

p9

![](Model-PlayGround/1571518-20220228182516426-1153405849.png)


p10

![](Model-PlayGround/1571518-20220228182715376-396622561.png)

整体可视化

![](Model-PlayGround/1571518-20220228182931000-1708426110.png)

output 

![](Model-PlayGround/1571518-20220228181237953-201412330.png)



## ResNext

下一代 ResNet，更高效、更准确

网络设计图

![](Model-PlayGround/1571518-20220301095542036-1728996924.png)

Netron结构图

![](Model-PlayGround/1571518-20220301095746489-1691647850.png)

Zetane整体图

![](Model-PlayGround/1571518-20220301095849857-179924785.png)

局部细节图

下面是一个基本的结构，共包括两个输出层，其中一个输出层包含三个Conv卷积和两个ReLu，另一个输出层只包含一个Conv卷积。
最后合并两个输出通道的结果，输入下一层进行计算。

![](Model-PlayGround/1571518-20220301153844378-1978488961.png)

简单来看下效果

![](Model-PlayGround/1571518-20220301153932368-1388850870.png)

接下来是对上面基本结构的一个交叉循环，共计16个。

![](Model-PlayGround/1571518-20220301154203692-1453068831.png)

最终输出

![](Model-PlayGround/1571518-20220301154259564-1791948757.png)

output结果

![](Model-PlayGround/1571518-20220301100302416-343142941.png)



## Wide_ResNet

![](Model-PlayGround/1571518-20220301170110398-1298360538.png)
                                
Netron网络图
                                                                                                                                                                                                                                                     
![](Model-PlayGround/1571518-20220301181316458-2035910976.png)

Zetane整体结构

![](Model-PlayGround/1571518-20220301202937407-1847245913.png)

p1

![](Model-PlayGround/1571518-20220302085641382-65047282.png)

两个基本结构

结构一

![](Model-PlayGround/1571518-20220302085305787-31303168.png)

结构二

![](Model-PlayGround/1571518-20220302085410404-757800926.png)

下面分别来看下两个结构的可视化

结构一，分为两个输出层，一层仅包含一个Conv卷积，另外一层是包含三个Conv卷积和两个ReLu。

![](Model-PlayGround/1571518-20220302103556123-880678666.png)

![](Model-PlayGround/1571518-20220302103647756-126045488.png)


结构二，分为两个输出层，其中一层不包含操作，另外一层与结构一的第二层一样，包含三个Conv卷积和两个ReLu。

![](Model-PlayGround/1571518-20220302103922631-958348776.png)


中间连接部分，主要是承上启下，将两个输出通道的输出结果进行叠加融合，重新进行ReLu传递给下面。

![](Model-PlayGround/1571518-20220302104101642-1146895737.png)



## RegNet

Netron网络图

![](Model-PlayGround/1571518-20220302152004006-386926191.png)

Zetane整体图

![](Model-PlayGround/1571518-20220302152941039-787593432.png)

两个基本结构

结构一

![](Model-PlayGround/1571518-20220302182900281-2093413226.png)

结构二

![](Model-PlayGround/1571518-20220302182934830-797769578.png)


结构一

局部细节一

![](Model-PlayGround/1571518-20220302195917740-2116583784.png)

局部细节二

![](Model-PlayGround/1571518-20220303091849311-1418801263.png)

结构二

![](Model-PlayGround/1571518-20220303094321949-81552848.png)

整体效果

![](Model-PlayGround/1571518-20220303174323452-612469439.png)


局部细节

细节一

![](Model-PlayGround/1571518-20220303183044820-999853294.png)


细节二

![](Model-PlayGround/1571518-20220303183116488-1746000920.png)



连接部分

![](Model-PlayGround/1571518-20220303094156638-756170570.png)


结尾部分

![](Model-PlayGround/1571518-20220304203727276-1961049293.png)


