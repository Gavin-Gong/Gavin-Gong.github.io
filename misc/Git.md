### Git

#### config
> git config --global user.name "Gavin Gong"
> git config --global user.email "kefengong@gmail.com"

#### keygen
> sh-keygen -t rsa -C "kefengong@gmail.com"



#### 撤销未提交的修改

> git stash # 暂存

> git checkout -- . # 撤销所有修改

> git reset --hard HEAD # 重置到HEAD