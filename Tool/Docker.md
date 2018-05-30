### 切换源

>  curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://9cb0fcd8.m.daocloud.io # 设置源到到could

或者修改`/etc/docker/daemon.json`
```
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

>  sudo systemctl restart docker.service # 重启服务


#### 免sudo
> Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/v1.26/images/json: dial unix /var/run/docker.sock: connect: permission denied

> sudo -i