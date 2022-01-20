---
title: 通过kaggle-api下载数据集
date: 2022-01-20 23:25:07
tags: Kaggle
---

## Kaggle API使用教程

---

[https://www.kaggle.com 的](https://www.kaggle.com/)官方 API ，可使用 Python 3 中实现的命令行工具访问。

Beta 版 - Kaggle 保留修改当前提供的 API 功能的权利。

重要提示：使用 1.5.0 之前的 API 版本提交的比赛可能无法正常工作。如果您在提交竞赛时遇到困难，请使用 来检查您的版本`kaggle --version`。如果低于 1.5.0，请更新`pip install kaggle --upgrade`.

### 一、安装Kaggle环境并配置

#### 1.1 安装Kaggle Package

确保您安装了 Python 3 和包管理`pip`器。

运行以下命令以使用命令行访问 Kaggle API：

`pip install kaggle`（您可能需要`pip install --user kaggle`在 Mac/Linux 上执行。如果在安装过程中出现问题，建议这样做。）`sudo pip install kaggle`除非您了解自己在做什么，否则通过 root 用户（即）完成的安装将无法正常工作。即便如此，它们仍然可能不起作用。如果出现权限错误，强烈建议用户安装。

您现在可以使用`kaggle`以下示例中所示的命令。

如果遇到`kaggle: command not found`错误，请确保您的 Python 二进制文件在您的路径上。您可以`kaggle`通过执行`pip uninstall kaggle`并查看二进制文件的位置来查看安装位置。对于 Linux 上的本地用户安装，默认位置是`~/.local/bin`. 在 Windows 上，默认位置是`$PYTHON_HOME/Scripts`.

重要提示：我们不提供 Python 2 支持。在报告任何问题之前，请确保您使用的是 Python 3。

#### 1.2 API Token配置

要使用 Kaggle API，请在[https://www.kaggle.com](https://www.kaggle.com/)注册一个 Kaggle 帐户。

注册成功后登录kaggle

- 点击右上角头像处，会弹出相关侧边栏设置，如下

<img src="https://img2020.cnblogs.com/blog/1571518/202110/1571518-20211027105535901-405781655.png" style="zoom:67%;" />

- 点击Your Profile，进入设置

  ![](https://img2020.cnblogs.com/blog/1571518/202110/1571518-20211027105906204-15480096.png)

- 在上面的页面找到API对应的设置，点击Create New Token，这将触发下载包含您的 API 凭据的文件`kaggle.json`。对应的kagge.json如下

  ![](https://img2020.cnblogs.com/blog/1571518/202110/1571518-20211027110505259-1558319378.png)

kaggle配置
本机安装kaggle api

```shell
pip install kaggle
```

将此文件放在该位置`~/.kaggle/kaggle.json`

若没有这个目录，则在根目录下创建.kaggle文件夹，再把kaggle.json放入

```shell
cd ~
mkdir .kaggle
cd ~/.kaggle/
```

（在 Windows 上的该位置`C:\Users\<Windows-username>\.kaggle\kaggle.json`- 您可以检查确切位置，无驱动器，使用`echo %HOMEPATH%`）。您可以定义一个 shell 环境变量`KAGGLE_CONFIG_DIR`来将此位置更改为`$KAGGLE_CONFIG_DIR/kaggle.json`（在 Windows 上为`%KAGGLE_CONFIG_DIR%\kaggle.json`）。

为了您的安全，请确保您计算机的其他用户对您的凭据没有读取权限。在基于 Unix 的系统上，您可以使用以下命令执行此操作：

```
chmod 600 ~/.kaggle/kaggle.json
```

您还可以选择将您的 Kaggle 用户名和令牌导出到环境中：

```
导出KAGGLE_USERNAME=datadinosaur
导出KAGGLE_KEY=xxxxxxxxxxxxxx
```

此外，您可以导出通常采用`$HOME/.kaggle/kaggle.json`“KAGGLE_”格式（注意大写）的任何其他配置值。
例如，如果文件具有变量“proxy”，您将导出`KAGGLE_PROXY` 并由客户端查看。





### 二、Kaggle Command命令使用

命令行工具支持以下命令：

```shell
kaggle competitions {list, files, download, submit, submissions, leaderboard}
kaggle datasets {list, files, download, create, version, init}
kaggle kernels {list, init, push, pull, output, status}
kaggle config {view, set, unset}
```

有关使用这些命令中的每一个，请参阅下面的更多详细信息。




#### 2.1 Competitions比赛

该 API 支持以下用于 Kaggle 比赛的命令。

```shell
usage: kaggle competitions [-h]
                           {list,files,download,submit,submissions,leaderboard}
                           ...
optional arguments:
  -h, --help            show this help message and exit
commands:
  {list,files,download,submit,submissions,leaderboard}
    list                List available competitions
    files               List competition files
    download            Download competition files
    submit              Make a new competition submission
    submissions         Show your competition submissions
    leaderboard         Get competition leaderboard information
```

##### 2.1.1 列出比赛

```shell
usage: kaggle competitions list [-h] [--group GROUP] [--category CATEGORY] [--sort-by SORT_BY] [-p PAGE] [-s SEARCH] [-v]

optional arguments:
  -h, --help            show this help message and exit
  --group GROUP         Search for competitions in a specific group. Default is 'general'. Valid options are 'general', 'entered', and 'inClass'
  --category CATEGORY   Search for competitions of a specific category. Default is 'all'. Valid options are 'all', 'featured', 'research', 'recruitment', 'gettingStarted', 'masters', and 'playground'
  --sort-by SORT_BY     Sort list results. Default is 'latestDeadline'. Valid options are 'grouped', 'prize', 'earliestDeadline', 'latestDeadline', 'numberOfTeams', and 'recentlyCreated'
  -p PAGE, --page PAGE  Page number for results paging. Page size is 20 by default 
  -s SEARCH, --search SEARCH
                        Term(s) to search for
  -v, --csv             Print results in CSV format
                        (if not set print in table format)
```

使用实例:

```shell
kaggle competitions list -s health
```

```shell
kaggle competitions list --category gettingStarted
```

##### 2.1.2 列出比赛文件

```shell
usage: kaggle competitions files [-h] [-v] [-q] [competition]

optional arguments:
  -h, --help   show this help message and exit
  competition  Competition URL suffix (use "kaggle competitions list" to show options)
               If empty, the default competition will be used (use "kaggle config set competition")"
  -v, --csv    Print results in CSV format (if not set print in table format)
  -q, --quiet  Suppress printing information about the upload/download progress
```

使用实例：

```shell
kaggle competitions files favorita-grocery-sales-forecasting
```

##### 2.1.3 下载比赛文件

```shell
usage: kaggle competitions download [-h] [-f FILE_NAME] [-p PATH] [-w] [-o]
                                    [-q]
                                    [competition]

optional arguments:
  -h, --help            show this help message and exit
  competition           Competition URL suffix (use "kaggle competitions list" to show options)
                        If empty, the default competition will be used (use "kaggle config set competition")"
  -f FILE_NAME, --file FILE_NAME
                        File name, all files downloaded if not provided
                        (use "kaggle competitions files -c <competition>" to show options)
  -p PATH, --path PATH  Folder where file(s) will be downloaded, defaults to current working directory
  -w, --wp              Download files to current working path
  -o, --force           Skip check whether local version of file is up to date, force file download
  -q, --quiet           Suppress printing information about the upload/download progress
```

使用实例：

```
kaggle competitions download favorita-grocery-sales-forecasting
kaggle competitions download favorita-grocery-sales-forecasting -f test.csv.7z
```

注意：您需要在 接受比赛规则`https://www.kaggle.com/c/<competition-name>/rules`。

##### 2.1.4 提交比赛

```shell
usage: kaggle competitions submit [-h] -f FILE_NAME -m MESSAGE [-q]
                                  [competition]

required arguments:
  -f FILE_NAME, --file FILE_NAME
                        File for upload (full path)
  -m MESSAGE, --message MESSAGE
                        Message describing this submission

optional arguments:
  -h, --help            show this help message and exit
  competition           Competition URL suffix (use "kaggle competitions list" to show options)
                        If empty, the default competition will be used (use "kaggle config set competition")"
  -q, --quiet           Suppress printing information about the upload/download progress
```

使用实例：

```
kaggle competitions submit favorita-grocery-sales-forecasting -f sample_submission_favorita.csv.7z -m "My submission message"
```

注意：您需要在 接受比赛规则`https://www.kaggle.com/c/<competition-name>/rules`。

##### 2.1.5 列出参赛作品

```shell
usage: kaggle competitions submissions [-h] [-v] [-q] [competition]

optional arguments:
  -h, --help   show this help message and exit
  competition  Competition URL suffix (use "kaggle competitions list" to show options)
               If empty, the default competition will be used (use "kaggle config set competition")"
  -v, --csv    Print results in CSV format (if not set print in table format)
  -q, --quiet  Suppress printing information about the upload/download progress
```

使用实例：
kaggle competitions submissions favorita-grocery-sales-forecasting

注意：您需要在 接受比赛规则https://www.kaggle.com/c/<competition-name>/rules。

##### 2.1.6 获取比赛排行榜

```shell
usage: kaggle competitions leaderboard [-h] [-s] [-d] [-p PATH] [-v] [-q]
                                       [competition]

optional arguments:
  -h, --help            show this help message and exit
  competition           Competition URL suffix (use "kaggle competitions list" to show options)
                        If empty, the default competition will be used (use "kaggle config set competition")"
  -s, --show            Show the top of the leaderboard
  -d, --download        Download entire leaderboard
  -p PATH, --path PATH  Folder where file(s) will be downloaded, defaults to current working directory
  -v, --csv             Print results in CSV format (if not set print in table format)
  -q, --quiet           Suppress printing information about the upload/download progress
```

例子：

```shell
kaggle competitions leaderboard favorita-grocery-sales-forecasting -s
```

#### 2.2 数据集

API 支持以下用于 Kaggle 数据集的命令。

```shell
usage: kaggle datasets [-h]
                       {list,files,download,create,version,init,metadata,status} ...

optional arguments:
  -h, --help            show this help message and exit

commands:
  {list,files,download,create,version,init,metadata, status}
    list                List available datasets
    files               List dataset files
    download            Download dataset files
    create              Create a new dataset
    version             Create a new dataset version
    init                Initialize metadata file for dataset creation
    metadata            Download metadata about a dataset
    status              Get the creation status for a dataset
```

##### 2.2.1 列出数据集

```shell
usage: kaggle datasets list [-h] [--sort-by SORT_BY] [--size SIZE] [--file-type FILE_TYPE] [--license LICENSE_NAME] [--tags TaG_IDS] [-s SEARCH] [-m] [--user USER] [-p PAGE] [-v]

optional arguments:
  -h, --help            show this help message and exit
  --sort-by SORT_BY     Sort list results. Default is 'hottest'. Valid options are 'hottest', 'votes', 'updated', and 'active'
  --size SIZE           Search for datasets of a specific size. Default is 'all'. Valid options are 'all', 'small', 'medium', and 'large'
  --file-type FILE_TYPE Search for datasets with a specific file type. Default is 'all'. Valid options are 'all', 'csv', 'sqlite', 'json', and 'bigQuery'. Please note that bigQuery datasets cannot be downloaded
  --license LICENSE_NAME 
                        Search for datasets with a specific license. Default is 'all'. Valid options are 'all', 'cc', 'gpl', 'odb', and 'other'
  --tags TAG_IDS        Search for datasets that have specific tags. Tag list should be comma separated                      
  -s SEARCH, --search SEARCH
                        Term(s) to search for
  -m, --mine            Display only my items
  --user USER           Find public datasets owned by a specific user or organization
  -p PAGE, --page PAGE  Page number for results paging. Page size is 20 by default
  -v, --csv             Print results in CSV format (if not set print in table format)
```

使用实例：

```shell
kaggle datasets list -s demographics
kaggle datasets list --sort-by votes
```

##### 2.2.2 列出数据集的文件

```shell
usage: kaggle datasets files [-h] [-v] [dataset]

optional arguments:
  -h, --help  show this help message and exit
  dataset     Dataset URL suffix in format <owner>/<dataset-name> (use "kaggle datasets list" to show options)
  -v, --csv   Print results in CSV format (if not set print in table format)
```

使用实例：

```shell
kaggle datasets files zillow/zecon
```

##### 2.2.3 下载数据集文件

```shell
usage: kaggle datasets download [-h] [-f FILE_NAME] [-p PATH] [-w] [--unzip]
                                [-o] [-q]
                                [dataset]

optional arguments:
  -h, --help            show this help message and exit
  dataset               Dataset URL suffix in format <owner>/<dataset-name> (use "kaggle datasets list" to show options)
  -f FILE_NAME, --file FILE_NAME
                        File name, all files downloaded if not provided
                        (use "kaggle datasets files -d <dataset>" to show options)
  -p PATH, --path PATH  Folder where file(s) will be downloaded, defaults to current working directory
  -w, --wp              Download files to current working path
  --unzip               Unzip the downloaded file. Will delete the zip file when completed.
  -o, --force           Skip check whether local version of file is up to date, force file download
  -q, --quiet           Suppress printing information about the upload/download progress
```

使用实例：

```shell
kaggle datasets download zillow/zecon
kaggle datasets download zillow/zecon -f State_time_series.csv
```

请注意，无法下载 BigQuery 数据集。

在对应数据集上找到API command，复制到剪切板

![](https://img2020.cnblogs.com/blog/1571518/202110/1571518-20211027111605969-1361034724.png)

如上面这个数据集的命令就是：

```shell
kaggle datasets download -d cisautomotiveapi/large-car-dataset
```

![](https://img2020.cnblogs.com/blog/1571518/202110/1571518-20211027113501374-515641469.png)

##### 2.2.4 初始化元数据文件以创建数据集

```shell
usage: kaggle datasets init [-h] [-p FOLDER]

optional arguments:
  -h, --help            show this help message and exit
  -p FOLDER, --path FOLDER
                        Folder for upload, containing data files and a special dataset-metadata.json file (https://github.com/Kaggle/kaggle-api/wiki/Dataset-Metadata). Defaults to current working directory
```

使用实例：

```shell
kaggle datasets init -p /path/to/dataset
```

##### 2.2.5 创建新数据集

如果要创建新的数据集，首先需要启动元数据文件。您可以通过`kaggle datasets init`如上所述运行来实现这一点。

```shell
usage: kaggle datasets create [-h] [-p FOLDER] [-u] [-q] [-t] [-r {skip,zip,tar}]

optional arguments:
  -h, --help            show this help message and exit
  -p FOLDER, --path FOLDER
                        Folder for upload, containing data files and a special dataset-metadata.json file (https://github.com/Kaggle/kaggle-api/wiki/Dataset-Metadata). Defaults to current working directory
  -u, --public          Create publicly (default is private)
  -q, --quiet           Suppress printing information about the upload/download progress
  -t, --keep-tabular    Do not convert tabular files to CSV (default is to convert)
  -r {skip,zip,tar}, --dir-mode {skip,zip,tar}
                        What to do with directories: "skip" - ignore; "zip" - compressed upload; "tar" - uncompressed upload
```

使用实例：

```shell
kaggle datasets create -p /path/to/dataset
```

##### 2.2.6 创建新的数据集版本

```shell
usage: kaggle datasets version [-h] -m VERSION_NOTES [-p FOLDER] [-q] [-t]
                               [-r {skip,zip,tar}] [-d]

required arguments:
  -m VERSION_NOTES, --message VERSION_NOTES
                        Message describing the new version

optional arguments:
  -h, --help            show this help message and exit
  -p FOLDER, --path FOLDER
                        Folder for upload, containing data files and a special dataset-metadata.json file (https://github.com/Kaggle/kaggle-api/wiki/Dataset-Metadata). Defaults to current working directory
  -q, --quiet           Suppress printing information about the upload/download progress
  -t, --keep-tabular    Do not convert tabular files to CSV (default is to convert)
  -r {skip,zip,tar}, --dir-mode {skip,zip,tar}
                        What to do with directories: "skip" - ignore; "zip" - compressed upload; "tar" - uncompressed upload
  -d, --delete-old-versions
                        Delete old versions of this dataset
```

使用实例：

```shell
kaggle datasets version -p /path/to/dataset -m "Updated data"
```

##### 2.2.7 下载现有数据集的元数据

```shell
usage: kaggle datasets metadata [-h] [-p PATH] [dataset]

optional arguments:
  -h, --help            show this help message and exit
  dataset               Dataset URL suffix in format <owner>/<dataset-name> (use "kaggle datasets list" to show options)
  -p PATH, --path PATH  Location to download dataset metadata to. Defaults to current working directory
```

使用实例：

```shell
kaggle datasets metadata -p /path/to/download zillow/zecon
```

##### 2.2.8 取数据集创建状态

```shell
usage: kaggle datasets status [-h] [dataset]

optional arguments:
  -h, --help  show this help message and exit
  dataset     Dataset URL suffix in format <owner>/<dataset-name> (use "kaggle datasets list" to show options)
```

使用实例：

```shell
kaggle datasets status zillow/zecon
```



#### 2.3 kernel内核

该 API 支持 Kaggle 内核的以下命令。

```
usage: kaggle kernels [-h] {list,init,push,pull,output,status} ...

optional arguments:
  -h, --help            show this help message and exit

commands:
  {list,init,push,pull,output,status}
    list                List available kernels
    init                Initialize metadata file for a kernel
    push                Push new code to a kernel and run the kernel
    pull                Pull down code from a kernel
    output              Get data output from the latest kernel run
    status              Display the status of the latest kernel run
```

##### 2.3.1 列出内核

```shell
usage: kaggle kernels list [-h] [-m] [-p PAGE] [--page-size PAGE_SIZE] [-s SEARCH] [-v]
                           [--parent PARENT] [--competition COMPETITION]
                           [--dataset DATASET]
                           [--user USER] [--language LANGUAGE]
                           [--kernel-type KERNEL_TYPE]
                           [--output-type OUTPUT_TYPE] [--sort-by SORT_BY]

optional arguments:
  -h, --help            show this help message and exit
  -m, --mine            Display only my items
  -p PAGE, --page PAGE  Page number for results paging. Page size is 20 by default
  --page-size PAGE_SIZE Number of items to show on a page. Default size is 20, max is 100
  -s SEARCH, --search SEARCH
                        Term(s) to search for
  -v, --csv             Print results in CSV format (if not set print in table format)
  --parent PARENT       Find children of the specified parent kernel
  --competition COMPETITION
                        Find kernels for a given competition
  --dataset DATASET     Find kernels for a given dataset
  --user USER           Find kernels created by a given user
  --language LANGUAGE   Specify the language the kernel is written in. Default is 'all'. Valid options are 'all', 'python', 'r', 'sqlite', and 'julia'
  --kernel-type KERNEL_TYPE
                        Specify the type of kernel. Default is 'all'. Valid options are 'all', 'script', and 'notebook'
  --output-type OUTPUT_TYPE
                        Search for specific kernel output types. Default is 'all'. Valid options are 'all', 'visualizations', and 'data'
  --sort-by SORT_BY     Sort list results. Default is 'hotness'.  Valid options are 'hotness', 'commentCount', 'dateCreated', 'dateRun', 'relevance', 'scoreAscending', 'scoreDescending', 'viewCount', and 'voteCount'. 'relevance' is only applicable if a search term is specified.
```

使用实例：

```shell
kaggle kernels list -s titanic
kaggle kernels list --language python
```

##### 2.3.2 为内核初始化元数据文件

```shell
usage: kaggle kernels init [-h] [-p FOLDER]

optional arguments:
  -h, --help            show this help message and exit
  -p FOLDER, --path FOLDER
                        Folder for upload, containing data files and a special kernel-metadata.json file (https://github.com/Kaggle/kaggle-api/wiki/Kernel-Metadata). Defaults to current working directory
```

使用实例：

```shell
kaggle kernels init -p /path/to/kernel
```

##### 2.3.3 推送内核

```
usage: kaggle kernels push [-h] -p FOLDER

optional arguments:
  -h, --help            show this help message and exit
  -p FOLDER, --path FOLDER
                        Folder for upload, containing data files and a special kernel-metadata.json file (https://github.com/Kaggle/kaggle-api/wiki/Kernel-Metadata). Defaults to current working directory
```

使用实例：

```shell
kaggle kernels push -p /path/to/kernel
```

##### 2.3.4 拉一个内核

```shell
usage: kaggle kernels pull [-h] [-p PATH] [-w] [-m] [kernel]

optional arguments:
  -h, --help            show this help message and exit
  kernel                Kernel URL suffix in format <owner>/<kernel-name> (use "kaggle kernels list" to show options)
  -p PATH, --path PATH  Folder where file(s) will be downloaded, defaults to current working directory
  -w, --wp              Download files to current working path
  -m, --metadata        Generate metadata when pulling kernel
```

使用实例：

```shell
kaggle kernels pull rtatman/list-of-5-day-challenges -p /path/to/dest
```

##### 2.3.5 检索内核的输出

```shell
usage: kaggle kernels output [-h] [-p PATH] [-w] [-o] [-q] [kernel]

optional arguments:
  -h, --help            show this help message and exit
  kernel                Kernel URL suffix in format <owner>/<kernel-name> (use "kaggle kernels list" to show options)
  -p PATH, --path PATH  Folder where file(s) will be downloaded, defaults to current working directory
  -w, --wp              Download files to current working path
  -o, --force           Skip check whether local version of file is up to date, force file download
  -q, --quiet           Suppress printing information about the upload/download progress
```

使用实例：

```shell
kaggle kernels output mrisdal/exploring-survival-on-the-titanic -p /path/to/dest
```

##### 2.4.6 获取最新内核运行的状态

```shell
usage: kaggle kernels status [-h] [kernel]

optional arguments:
  -h, --help  show this help message and exit
  kernel      Kernel URL suffix in format <owner>/<kernel-name> (use "kaggle kernels list" to show options)
```

使用实例：

```shell
kaggle kernels status mrisdal/exploring-survival-on-the-titanic
```



#### 2.4 Config配置

API 支持以下命令进行配置。

```shell
usage: kaggle config [-h] {view,set,unset} ...

optional arguments:
  -h, --help        show this help message and exit

commands:
  {view,set,unset}
    view            View current config values
    set             Set a configuration value
    unset           Clear a configuration value
```

##### 2.4.1 查看当前配置值

```shell
usage: kaggle config path [-h] [-p PATH]

optional arguments:
  -h, --help            show this help message and exit
  -p PATH, --path PATH  folder where file(s) will be downloaded, defaults to current working directory
```

使用实例：

```shell
kaggle config path -p C:\
```

##### 2.4.2 查看当前配置值

```shell
usage: kaggle config view [-h]

optional arguments:
  -h, --help  show this help message and exit
```

使用实例：

```shell
kaggle config view
```

##### 2.4.3 设置配置值

```shell
usage: kaggle config set [-h] -n NAME -v VALUE

required arguments:
  -n NAME, --name NAME  Name of the configuration parameter
                        (one of competition, path, proxy)
  -v VALUE, --value VALUE
                        Value of the configuration parameter, valid values depending on name
                        - competition: Competition URL suffix (use "kaggle competitions list" to show options)
                        - path: Folder where file(s) will be downloaded, defaults to current working directory
                        - proxy: Proxy for HTTP requests
```

使用实例：

```shell
kaggle config set -n competition -v titanic
```

##### 2.4.4 清除配置值

```shell
usage: kaggle config unset [-h] -n NAME

required arguments:
  -n NAME, --name NAME  Name of the configuration parameter
                        (one of competition, path, proxy)
```

使用实例：

```shell
kaggle config unset -n competition
```
