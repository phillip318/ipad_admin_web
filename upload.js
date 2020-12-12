const Client = require('node-ssh');
const path = require('path')
const ssh = new Client();
async function upload () {
  await ssh.connect({
    host: '8.129.54.175',
    username: 'root',
    password: 'Ll101480024',
  });
  
  console.log('**********链接成功**********')
  const failed = []
  try {
    await ssh.putDirectory(path.resolve(__dirname, './dist'), '/usr/local/www/ipad_admin_web', {
      recursive: true, // 递归
      concurrency: 25, // 并发数
      tick: function(localPath, remotePath, error) {
        if (error) {
          failed.push(localPath)
        } else {
          // successful.push(localPath)
        }
      }
    });
    console.log('**********上传成功**********');
  
  } catch (e) {
    console.log(e)
    console.log('\n**********上传失败文件列表*********\n', failed.join(',\n '))
    // console.log('\nsuccessful transfers\n', successful.join(',\n '))
  }
  
  await ssh.dispose();
}

upload()