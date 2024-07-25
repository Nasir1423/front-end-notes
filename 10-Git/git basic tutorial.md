> git 是一个**分布式**的**版本控制工具**

## git 的安装

1. 安装地址：[Git - Downloading Package (git-scm.com)](https://git-scm.com/download/win)

2. 安装成功检验：命令行输入 `git -v`



## Git 的初始化配置

安装好 Git 后需要对其进行初始化配置（即设置提交代码时的用户信息），即在命令行环境下执行以下代码，

```powershell
git config --global user.name "Nasir"  # 全局配置用户名为 Nasir，当用户名有空格时需要使用双引号，否则可以省略双引号
git config --global user.email "wangjian1423@foxmail.com"  # 全局配置用户邮箱，可以省略双引号
git config --global credential.helper store  # 保存全局配置信息
```

其中参数 `--global` 表示全局配置，即对所有仓库生效；也可以取参数 `--system` 表示系统配置，即对所有用户生效；默认省略表示 `Local` 本地配置，即只对本地仓库生效。



当完成初始化操作后，可以用以下代码查看全局配置信息，

```powershell
git config --global --list  # 查看全局配置信息
```

此外，可以根据以下代码对全局配置文件进行修改，

```powershell
git config --global -e  # 修改全局配置文件
```



## 新建仓库

版本库：又称仓库，英文为 Repository(Repo)。可以**将一个仓库看作一个目录**，Git 可以管理其中所有的文件，并且可以跟踪文件的增删改等操作，从而可以实现历史追踪和版本还原的目的。其中，**每一个 Git 仓库中都有一个 .git 目录**，表示当前目录（.git 所在目录）是一个 Git 仓库，所有 Git 需要的数据和资源都存放在这个目录中。



关于仓库的创建，一共有两种方式：**本地创建新仓库**或**克隆远程仓库**。



关于在本地创建仓库有如下两种语法（假设当前目录记为 /learn-git），

```powershell
# 第一种方式：在 /learn-git 中创建一个 .git 隐藏目录，/learn-git 即为新建的本地仓库
git init
# 第二种方式：在 /learn-git/project-name 中创建一个 .git 隐藏目录，/learn-git/project-name 即为新建的本地仓库
git init [project-name]
```

关于从远程服务器（如 GitHub、GitLab、Gitee）上克隆一个已经存在的仓库，语法如下，

```powershell
# 从指定 url 克隆一个仓库到本地的 /learn-git 目录下，/learn-git/new-repo 即为克隆的远程仓库
git clone [url]
```



## Git 的工作区域

假设本地仓库为 /learn-git，则对 Git 的工作区域有如下概念，

1. **工作区** Working Directory：电脑里可以直接看到的目录，即 /learn-git 或者说是 **.git 所在的目录**。
2. **暂存区** Stage/Index：用于**临时存放未提交的内容**，一般存放在 **.git 目录下的 index 文件**中（路径为 /learn-git/.git/index）。
3. **本地仓库** Repository： Git 在本地的**版本库**，对应工作区的隐藏目录 .git。
4. **远程仓库** Remote Repository：托管在远程服务器上的仓库。

<div align=center> <img src="https://raw.githubusercontent.com/Nasir1423/blog-img/main/image-20231116220108597.png" alt="image-20231116220108597" style="zoom: 50%;" />



## Git 的文件状态

1. **未跟踪** Untrack：文件未被 Git 跟踪，使用 `git add` 将文件添加到暂存区，文件才能被跟踪。
2. **未修改** Unmodified：文件已被 Git 跟踪，但是没有进行任何修改，此时工作目录和本地仓库中的文件内容一致。
3. **已修改** Modified：文件已被 Git 跟踪，在工作目录中进行了修改，但是没有保存到暂存区。
4. **已暂存** Staged：文件已被添加到 Git 的暂存区，可以使用 `git commit` 将暂存区的文件提交到本地仓库。
5. **已提交** Committed：文件已被成功提交到本地仓库，此时工作目录和本地仓库中的文件内容一致。

<div align=center><img src="https://raw.githubusercontent.com/Nasir1423/blog-img/main/image-20231116211726737.png" alt="image-20231116211726737" style="zoom: 20%;" align=center />

## 文件添加及提交

对于一个仓库，可以使用如下命令**查看仓库的状态信息**，

```powershell
git status  # 查看仓库的状态信息
git status  # 查看简短的仓库状态信息
```

其中，仓库的状态信息包括：当前分支的名称、当前分支与远程分支的关系、未暂存的修改、未跟踪的文件。



使用以下命令可以**将文件的修改添加到暂存区**，

```powershell
git add [filename1] [filename2] [...]  # 将指定文件添加到暂存区
git add [dir]  # 将指定目录下的所有文件添加到暂存区
git add .  # 将当前目录下的所有文件添加到暂存区
git add *.txt  # 通配符操作：将所有的 txt 文件添加到暂存区
```



使用以下命令可以**将暂存区的内容提交到本地仓库**，

```powershell
git commit -m [message]  # 将暂存区的内容提交到本地仓库
git commit [filename1] [filename2] [...] -m [message]  # 将暂存区的指定文件提交到本地仓库
```

其中，message 是关于本次提交的备注信息，在 Linux 系统使用单引号，Windows 系统使用双引号。



使用以下命令可以**查看 Git 仓库的历史提交记录**，

```powershell
git log  # 查看 Git 仓库的历史提交记录
git log --oneline  # 查看 Git 仓库的历史提交记录的简介版本
```

其中，历史提交记录包括：最新提交到最早提交的所有提交信息，包括提交的哈希值、作者、日期和备注信息（message）等。



## 回退版本

对于一个仓库，每次提交（commit）对应一个版本，可以通过如下命令实现**版本回退**，

```powershell
# git reset 命令的一般语法，其中 --mixed 为默认参数
## --soft 表示回退到指定版本后，不修改工作目录和暂存区
## --mixed 表示回退到指定版本后，不修改工作目录，但是会清除暂存区的更改
## --hard 表示回退到指定版本后，清除工作目录和暂存区的所有更改（谨慎使用）
## HEAD 表示当前版本，HEAD^(或HEAD~) 表示上一个版本，HEAD^^ 表示上上一个版本 ...
## HEAD~0 表示当前版本，HEAD~1 表示上一个版本，HEAD~2 表示上上一个版本 ...
## 此外，也可以用版本的哈希值来指定回退的版本
git reset [--soft | --mixed | --hard] [HEAD|commit_hash]
```



通过以下命令可以**查看引用日志**，

```powershell
git reflog  # 查看引用日志
```

其中，引用日志记录了仓库中的引用的更改历史：如创建、删除、移动等操作。



此外，可以通过 `git ls-files` 查看暂存区文件。



## 查看差异

**查看工作区与暂存区之间的差异**，

```powershell
git diff  # 工作区 vs 暂存区
git diff [filename]  # 工作区的 filename 文件 vs 暂存区的 filename 文件
```



**查看工作区及暂存区与本地仓库之间的差异**，

```powershell
git diff HEAD  # 工作区 + 暂存区 vs 本地仓库
git diff HEAD [filename]  # 查看不同区域指定文件的差异
```



**查看暂存区与本地仓库之间的差异**，

```powershell
git diff --cached/--staged  # 暂存区 vs 本地仓库
git diff --cached/--staged [filename]  # 查看不同区域指定文件的差异
```



**查看不同版本（提交）之间的差异**，

```powershell
git diff [commit_hash|HEAD] [commit_hash|HEAD]  # 版本1 vs 版本2
git diff [commit_hash|HEAD] [commit_hash|HEAD] [filename]  # 查看不同区域指定文件的差异
```



**查看不同分支之间的差异**，

```powershell
git diff [branch_name] [branch_name]  # 分支1 vs 分支2
```



## 删除文件

这里指的删除文件意思是**将文件从工作区和暂存区删除**，命令如下，

```powershell
# 方法1：本地删除工作区文件，然后 git add 删除暂存区文件
rm [filename]
git add [filename]
# 方法2：将文件从工作区和暂存区同时删除
git rm [filename]
```

 

如果需要**将文件仅从暂存区删除**，仍保留当前工作区中的文件内容，命令如下，

```powershell
git rm --cached [filename]
```



**递归删除某个目录下的所有子目录和文件**，命令如下，

```powershell
git rm -r *
```



> 注意：当文件删除后，不要忘记提交 commit



## 忽略文件

使用 Git 的过程中，有的文件比如日志，临时文件，编译的中间文件等不要提交到代码仓库，这时就要设置相应的忽略规则，来忽略这些文件的提交。

Git 允许在工作区自定义一个名为 **.gitignore** 文件，该文件的内容声明了 Git 要忽略的文件或目录，这样当使用 `git add .` 时，这些文件会被 Git 自动忽略掉。



如果有些文件被 Git 忽略，则无法通过 `git add` 将文件加入暂存区，需要使用如下命令才可以能**强制添加到暂存区中**，

```powershell
git add -f [filename]
```

此外，如果不小心将需要忽略的文件添加到暂存区了，则可以使用以下命令将其移除，

```powershell
git rm --cached [filename]
```



**Git 忽略文件的原则**

1. 忽略系统或软件自动生成的文件
2. 忽略编译产生的中间文件和结果文件
3. 忽略运行时生成的日志文件、缓存文件和临时文件
4. 忽略涉及身份、密码、口令、密钥等敏感信息文件



Git 对 **.gitignore** 文件从上到下逐行匹配，每一行代表一个**忽略规则**，**.gitignore 忽略规则的匹配语法**为，

1. **空行 or 以 # 开头的行会被 Git 忽略**。空行一般用于可读性分隔；# 一般用于注释。
2. Git 可以识别 **Glob 模式匹配**：
  - 星号 * 通配**任意个字符**
  - 问号 ? 匹配**单个字符**
  - 中括号 [] 表示匹配**列表中的单个字符**
3. 两个星号 ** 表示匹配**任意的中间目录**。
4. 中括号可以使用短中线连接进行匹配：
   - [0-9] 表示匹配**任意一位数字**
   - [a-z] 表示匹配**任意一位小写字母**
5. 感叹号 ! 表示**取反**。



## Github 远程仓库

**Github 仓库的访问有 HTTPS 和 SSH 两种方式**，其中 SSH 更为简单，只需要在本地生成 SSH Key，然后配置到 Github 上即可。



可以使用以下命令**将 Github 远程仓库克隆到本地**，

```powershell
git clone [remote-repo-address]  # 将远程仓库克隆到本地的当前目录
```



如果要**将本地仓库关联到远程仓库**，则首先需要在 Github 上创建一个新的仓库，然后执行以下命令，

```powershell
git remote add [remote-repo-alias] [remote-repo-address]  # 远程仓库别名一般取 origin
git branch -M main
git push -u [remote-repo-name] [remote-branch-name]
```



**查看远程仓库的别名、地址**等可以使用以下命令，

```powershell
git remote -v
```



可以使用如下命令进行**本地与远程仓库的数据更新**，

```powershell
# 更新远程仓库
git push [remote-repo-name] [remote-branch-name]  # 将本地更新同步到远程仓库

# 更新本地仓库
git pull [remote-repo-name] [remote-branch-name]:[local-branch-name]
git pull [remote-repo-name]  # 将远程仓库更新同步到本地仓库

# 更新本地仓库（只获取更改，需要手动进行合并操作）
git fetch
```



## 分支简介与基本操作

Git 中的每一个分支是一个单独开发线，其**基本操作命令**如下，

```powershell
# 1. 查看分支列表
git branch

# 2. 创建分支
git branch [branch-name]

# 3. 切换分支
git checkout [branch-name]  # 不推荐使用，因为该命令还有恢复文件的左右，易产生歧义
git switch [branch-name]

# 4. 合并分支
## Merge：不破坏原来分支的提交历史，方便回溯查看；但是会产生额外的提交节点，分支图比较复杂
git merge [branch-name]  # 将指定分支合并到当前分支上
## Rebase：不会新增额外的提交记录，形成线性历史，直观干净；但是会改变提交历史，因此避免在共享分支上使用
git rebase [branch-name]  # 将当前分支合并到特定分支上，当前分支合并的起点是与特定分支的公共父节点

# 5. 删除分支
git branch -d [branch-name]  # 删除已经合并后的分支
git branch -D [branch-name]  # 删除没有合并的分支
```



当两个分支未修改同一文件的同一处位置，则 Git 会自动合并，但是，当两个分支修改了同一个文件的同一处位置，则会产生冲突，关于**解决分支合并冲突**的方法如下，

```powershell
# 方法1：手动解决冲突
## Step1 手工修改冲突文件，合并冲突内容
## Step2 将修改后的冲突文件添加到暂存区 git add [confict-filename]
## Step3 提交修改 git commit -m [message]

# 方法2：中止合并过程
git merge --abort
```

