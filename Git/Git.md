# $\bf{Git}$

## ${\bf{Installation}}$​

从 https://git-scm.com/ 下载并安装 Git。安装完成后，在 `git bash` 中使用以下**版本查看命令**验证是否安装成功。

```bash
$ git --version
git version 2.42.0.windows.2
```

> 命令 `git -v` 也可以查看版本

## $\bf{Configuration}$ <span id="config"></span>

安装 Git 后，使用以下**全局配置命令**设置你的用**户名和电子邮件地址**。`--global` 表示配置适用于该电脑上的所有仓库，如果移除该选项，配置只对当前仓库生效。

```bash
$ git config --global user.name "用户名"
$ git config --global user.email "邮箱"
```

## $\bf{Initialization}$

使用 `cd` 命令进入项目文件夹（工作目录），然后运行**初始化命令**，将当前文件夹转换为 Git 可管理的仓库。此时 Git 会在当前文件夹中创建一个隐藏的文件夹 `.git/` 用于监视内容更改。

```bash
$ git init
Initialized empty Git repository in .../myproject/.git/
```

## $\bf{Status}$

$$
\bf{file\ status}\Rightarrow
\left\{
	\begin{matrix}
		\bf{untracked}\\
		\bf{tracked}\Rightarrow
            \left\{
                \begin{matrix}
                \bf{unmodified}\\
                \bf{modified}\\
                \bf{staged}
                \end{matrix}
            \right.
	\end{matrix}
\right.
$$

> 未跟踪文件：工作目录中的文件没有被 Git 管理。
>
> 未修改文件：工作目录中的文件内容与 Git 版本库中的文件内容相同。
>
> 已修改文件：工作目录中的文件内容与 Git 版本库中的文件内容不同。
>
> 已暂存文件：文件已被修改，并且这些修改已被暂存到 Git 暂存区，但尚未提交到 Git 版本库
>
> <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240707130509637.png" alt="image-20240707130509637" style="zoom:33%;" />

使用以下命令**查看当前仓库的状态信息**。

```bash
$ git status
```

> `git status` 常用于显示 ① 工作目录中**新增的未跟踪**的文件（Untracked files） ② **已修改或删除但是未暂存**的文件（Changes not staged for commit） ③ **已暂存但未提交**的文件（Changes to be committed） ④ 当前分支状态
>
> `git status --short` 以一种紧凑的方式查看文件做了哪些更改，对于不同的文件使用不同的符号标记其状态。`??` 表示未跟踪的文件，`A` 表示新增加的文件，`M` 表示修改了的文件，`D` 表示删除了的文件。
>
> 上述两种命令用于显示**工作目录和暂存环境的状态信息**。

### $\bf{Tracked \& Untracked}$

当文件第一次被添加到**工作目录**（Current Directory）时，其状态为**未跟踪**（Untracked）。此时，文件虽然存在于工作目录中，但尚未被添加到仓库，因此 Git 无法监视其变化。通过将文件**暂存**，可以将其状态变为**已跟踪**（Tracked）。此时，文件被添加到仓库中，Git 可以监视其变化。

> 工作目录 & 仓库：在 Git 中，**工作目录**是你实际操作和编辑文件的地方，而**仓库**是 Git 存储和管理文件版本历史的地方。工作目录包含当前的项目文件，而仓库包含这些文件的版本控制信息。

### $\bf{StagingEnvironment \& Staged}$​

文件只有添加到**暂存环境**（Staging Environment）后才能被 Git 监视，此时文件的状态为**已暂存**（Staged）。当我们**添加、修改、删除**文件时，都需要将文件添加到暂存环境。这是由于暂存的作用包括：① 将工作目录中**新创建**的文件添加到暂存环境，从而纳入版本控制。② 将已跟踪但是**修改**了的文件的当前内容添加到暂存环境。 ③ 将已跟踪但是**删除**了的文件的删除操作添加到暂存环境。总的来说，**暂存用于将工作目录中的更改（新增文件、修改文件、删除文件）添加到暂存环境**，以便在后续提交时包含这些更改。

使用以下命令**暂存单个文件**。

```bash
$ git add <filename>
```

使用以下命令**暂存所有文件**。

```bash
$ git add -all
```

```bash
$ git add *
```

```bash
$ git add -A
```

### $\bf{Commit}$

**暂存**（stage）的下一步就是**提交**（commit），前者将更改（新增、修改、删除）添加到暂存环境，后者**将暂存环境的内容提交到 Git 仓库中**，并形成一个新的提交。这个提交可以看作是项目的一个**存档点**（save point），通过提交记录可以实现版本回退和管理。

使用以下命令**提交暂存环境的内容并包含描述文字**。

```bash
$ git commit -m "描述文字"
```

使用以下命令**提交已跟踪文件的所有更改并包含描述文字**。该操作会自动将已跟踪文件的所有更改暂存，然后提交。注意：新增文件无法通过这种方式直接提交；因为可能会涉及到不必要的暂存操作（有些更改我们并不需要暂存），不建议使用这种提交方式。

```bash
$ git commit -a -m "描述文字"
```

使用以下命令**查看仓库的提交历史**。

```bash
$ git log
```

## $\bf{Help}$

使用以下命令查看**特定 Git 命令的用法**。

```bash
$ git <command> -help
```

使用以下命令查看**全部 Git 命令的用法**。

```bash
$ git help --all
```

## $\bf{Branch}$

Git 中的分支（branch）是**主仓库的一种新的、独立的版本**。默认情况下，主仓库使用主（main）分支。通过创建分支，程序员可以在不影响主分支的情况下处理项目的不同部分。一旦项目完成，分支可以合并到主分支中。

### $\bf{Create}$​

使用以下命令**创建一个新的分支**。

```bash
$ git branch <new-branch-name>
```

### $\bf{Delete}$

使用以下命令**删除一个特定分支**。

```bash
$ git branch -d <target-branch-name>
```

### $\bf{Show}$

使用以下命令**查看所有本地分支**。

```bash
$ git branch
* main
  test-branch
```

> 命令输出 `*` 用于标识当前分支

使用以下命令**查看所有远程分支**。

```bash
$ git branch -r
```

使用以下命令**查看所有本地分支和远程分支**。

```bash
$ git branch -a
```

### $\bf{Switch}$

使用以下命令**从当前分支切换到特定分支**。

```bash
$ git checkout <target-branch-name>
```

如果特定分支不存在，则使用以下命令**先创建特定分支，再从当前分支切换到特定分支**。

```bash
$ git checkout -b <target-branch-name>
```

> 当我们需要解决项目中的突发情况时，可以使用 `git checkout -b emergency-fix` 命令创建应急处理分支。在解决问题后，再将其与主分支合并。

### $\bf{Merge}$

当我们完成特定分支上的工作后，就可以将其与主分支合并，具体步骤如下：

1. **切换到主分支**

   ```bash
   $ git checkout main
   ```

2. **将当前分支（主分支）和特定分支合并**

   ```bash
   $ git merge <target-branch-name>
   ```

3. **删除已经合并到主分支的特定分支**

   ```bash
   $ git branch -d <target-branch-name>
   ```

#### $\bf{Conflict}$

如果特定分支和主分支**分别修改了同名文件**，使用 `git merge <target-branch-name>` 进行分支合并时就会产生**合并冲突**，此时我们可以**解决冲突或终止合并**。

- 解决冲突：首先，通过 `git status` 命令输出的 `Unmerged paths` 项中的内容确定是哪些文件引发了冲突。然后，修改这些文件解决冲突。最后，通过 `git commit -m "描述性文字"` 结束合并。
- 终止合并：使用 `git merge --abort` 来终止本次合并。

# $\bf{GitHub}$​

## $\bf{Connection}$

GitHub 是一个用于**托管**本地 Git 仓库的网站，**注册账号时必须使用与 [Configuration](#config) 中相同的邮箱**。为了将本地 Git 仓库托管到 GitHub 上，首先需要在 GitHub 上创建一个远程仓库，然后将本地仓库推送到远程仓库中。具体步骤如下：

1. **在 GitHub 上创建仓库**

2. **将本地仓库推送到 GitHub 仓库**

   - **获取 GitHub 仓库 URL**

     ![image-20240707145336729](https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240707145336729.png)

   - **为本地仓库添加远程仓库**

     ```bash
     $ git remote add origin <remote-repo-url>
     ```

   - **将本地主分支推送到远程仓库，并将其设置为默认的远程分支**

     ```bash
     $ git push --set-upstream origin main
     Enumerating objects: 3, done.
     Counting objects: 100% (3/3), done.
     Writing objects: 100% (3/3), 210 bytes | 210.00 KiB/s, done.
     Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
     To https://github.com/Nasir1423/learn-git
      * [new branch]      main -> main
     branch 'main' set up to track 'origin/main'.
     ```

     > 此时本地的 `main` 分支与远程仓库的 `origin/main` 分支建立了关联

## $\bf{Pull\&Push}$

我们可以使用 `git pull` **将远程仓库拉取到本地仓库**，也可以使用 `git push` **将本地仓库推送到远程仓库**。

### $\bf{Pull}$

`git pull` 命令是 `git fetch` 和 `git merge` 的结合，下面是对这三个命令用法的介绍。

#### $\bf{Fetch}$

使用以下命令可以**获取到远程仓库中的所有更改**。

```bash
$ git fetch origin
```

当我们获取到远程仓库的所有更改后，

- 使用以下命令**查看本地仓库与远程仓库之间的版本区别**，如落后了几个提交等等。

  ```bash
  $ git bash
  ```

- 使用以下命令**查看远程仓库的提交日志**。

  ```bash
  $ git log origin/main
  ```

- 使用以下命令**查看本地仓库与远程仓库之间的内容区别**，如哪些文件做了修改，修改了哪些内容等等。

  ```bash
  $ git diff origin/main
  ```

#### $\bf{Merge}$

使用以下命令**将远程仓库主分支合并到本地仓库的主分支**。

```bash
$ git merge origin/main
```

合并后，使用以下命令**查看本地仓库是否与远程仓库保持一致**。

```bash
$ git status
```

#### $\bf{Pull}$

使用以下命令可以**获取远程仓库的所有更改，同时将其合并到本地仓库的当前分支**。

```bash
$ git pull origin
```

### $\bf{Push}$

当我们在本地仓库作出修改并提交后，可以使用以下命令**查看本地仓库与远程仓库之间的版本区别**，如提前了几个提交等等。

```bash
$ git status
```

使用以下命令可以**将本地仓库的所有更改推送到远程仓库**。

```bash
$ git push origin
```

## $\bf{Branch}$

### $\bf{Create}$​

远程仓库的分支创建：点击 GitHub 仓库中的分支按钮，键入新的分支名，再点击创建分支。

![image-20240707160847218](https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240707160847218.png)

### $\bf{Pull}$​

Pull：获取远程分支，如何使得本地分支与远程分支建立跟踪关系。

本地分支和远程分支之间可以建立跟踪关系。当你在 `main` 分支上运行 `git pull` 命令时，它会从指定的远程仓库（通常是 `origin`）获取所有分支的更新。然后，它会将 `origin/main` 分支的更新合并到当前所在的 `main` 分支中，但不会自动合并其他远程分支的变更。以下是**建立本地分支和远程分支跟踪关系**的两种方式，

1. 如果不存在本地分支，可以使用以下命令**创建本地分支并跟踪同名远程分支，最后切换到这个创建的分支**：

   ```bash
   $ git checkout <remote-branch-name>
   ```

   或者：

   ```bash
   $ git checkout -b <remote-branch-name> origin/<remote-branch-name>
   ```

2. 如果已经存在本地分支，可以使用以下命令**指定已存在的本地分支跟踪远程分支**：

   ```bash
   $ git checkout <local-branch-name>
   $ git branch --set-upstream-to=origin/<remote-branch-name>
   ```

以下是**查看本地分支和远程分支之间依赖关系**的几种方式，

1. 使用以下命令**查看本地分支及其跟踪的远程分支**

   ```bash
   $ git branch -vv
   ```

2. 使用以下命令**查看远程仓库 origin 的详细信息，以及本地分支及其跟踪的远程分支**

   ```bash
   $ git remote show origin
   ```

3. 使用以下命令**查看当前分支状态及其跟踪的上游分支**

   ```bash
   $ git status -b
   ```

### $\bf{Push}$

Push：推送本地分支，如何使得远程分支与本地分支建立依赖关系。

使用以下命令**将本地分支推送到远程仓库，并创建对应的远程分支**。

```bash
$ git push origin <local-branch-name>
```

当 GitHub 存在响应的远程分支后，可以选择将其合并到远程主分支上。此时需要生成一份 Pull Request，用于记录合并的更改内容，并供他人审查。

## $\bf Fork$​

Fork 是 GitHub 提供的一个功能，用于创建他人仓库的一个副本。这个副本是独立于原始仓库的，允许用户在不影响原始仓库的情况下进行开发、修改和实验。

![image-20240707182300493](C:\Users\15787\AppData\Roaming\Typora\typora-user-images\image-20240707182300493.png)

## $\bf{Clone}$

Clone 是一个仓库的完整副本，包括所有日志和文件版本信息。

使用以下命令可以**克隆一个远程仓库到本地**。

```bash
$ git clone <URL>
```

使用以下命令可以**克隆一个远程仓库到本地，同时修改项目名称**。

```bash
$ git clone <URL> <project-name>
```

> 克隆一个远程仓库到本地后，需要进行以下远程配置，
>
> - 配置 `origin` 指向你 fork 的仓库，以便进行读写操作。
> - 配置 `upstream` 指向项目的原始仓库，用于获取更新，但只有读取权限。

在本地对克隆的仓库完成修改后，你可以使用 `git push` 将更改推送到你的 fork 仓库。然后，你可以创建一个 Pull Request 提交这些修改，等待原始仓库的维护者审核和合并。

# $\bf{.gitignore}$

Git 使用 `.gitignore` 文件来**指定哪些文件或目录应该被忽略，不被纳入版本控制中**。该文件位于项目的根目录下，其中列出的规则适用于整个项目。如果 `.gitignore` 文件位于子目录中，则只影响该子目录及其子目录中的文件和文件夹。

# $\bf{SSH}$

## $\bf{Intro}$

SSH (Secure Shell) 是一种**安全**的网络协议，用于网络管理、远程文件传输和远程系统访问。

- SSH 使用**一对 SSH 密钥**来建立经过认证和加密的安全网络协议。这对密钥包括**一个公钥和一个私钥**。它允许在不安全的开放网络上进行安全的远程通信。
- **公钥类似锁，用于加密数据。私钥类似钥匙，用于解密通过公钥加密的数据。**
- **公钥可以从私钥派生出来**，但无法反过来从公钥计算出私钥。只有私钥的持有者才能解密数据和进行身份验证。

## $\bf{Generating}$

可以使用以下命令**创建一对 SSH 密钥**。

```bash
ssh-keygen -t rsa -b 4096 -C "your-email-address" # ssh-keygen 是一个用于生成 SSH 密钥的命令行工具；-t rsa 指定加密算法为 RSA 算法；-b 4096 指定生成密钥的位数；-C "your-email-address" 是添加到生成的密钥中的注释，有助于标识和管理密钥
Generating public/private rsa key pair.
Enter file in which to save the key (C:\Users\15787/.ssh/id_rsa): C:\Users\15787\Desktop\.ssh\id_rsa # 指定私钥保存位置
Enter passphrase (empty for no passphrase): # 指定加密短语，提高安全等级
Enter same passphrase again: 
Your identification has been saved in C:\Users\15787\Desktop\.ssh\id_rsa. # 私钥位置
Your public key has been saved in C:\Users\15787\Desktop\.ssh\id_rsa.pub. # 公钥位置
The key fingerprint is:
SHA256:Lgo2D53Vq1/nWzEXI6qn6m5whfcaNZc5CQzsS7Xfomk your-email-address
The key's randomart image is:
+---[RSA 4096]----+
|        ..o      |
|         . +     |
|        o . o.+o |
|       o = +.*. o|
|      . S +.+ = .|
|   . + o +.. o = |
|  = o + o.+.+ o  |
| . = . + ooE .   |
|    o ==o.. o.   |
+----[SHA256]-----+
```

在创建好 SSH 密钥后，使用以下命令**将 SSH 密钥添加到 SSH-Agent**，从而简化 SSH 连接，提高安全性和便利性。

```bash
$ eval $(ssh-agent -s) # 启动 SSH-Agent
Agent pid 1164

$ ssh-add id_rsa # 将 SSH 私钥添加到 SSH-Agent
Enter passphrase for id_rsa: # 输入私钥的加密短语
Identity added: id_rsa (your-email-address)

$ ssh-add -l # 验证私钥是否已经成功添加
4096 SHA256:Lgo2D53Vq1/nWzEXI6qn6m5whfcaNZc5CQzsS7Xfomk your-email-address (RSA)
```

## $\bf SSH\ Key\ In\ GitHub$

1. **在 GitHub 上添加 SSH 公钥**：进入 https://github.com/settings/ssh/new 添加新的 SSH 公钥。

   ![image-20240707194510016](https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240707194510016.png)

2. **验证是否可以通过 SSH 连接 GitHub**。

   ```bash
   $ ssh -T git@github.com
   Hi Nasir1423! You've successfully authenticated, but GitHub does not provide shell access.
   ```

3. **通过 SSH 建立远程仓库连接**。

   ```bash
   $ git remote add ssh-origin git@github.com:username/reponame
   ```

   ```bash
   $ git remote set-url origin git@github.com:username/reponame
   ```

   > 第二种方式将远程仓库源由 HTTPS 连接修改为 SSH 连接
