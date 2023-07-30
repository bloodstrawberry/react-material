let myKey = "...";

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: myKey,
});

async function getSHA() {
  const result = await octokit.request('GET /repos/bloodstrawberry/auto-test/contents/test/apitest.txt', {
    owner: 'bloodstrawberry',
    repo: 'auto-test',
    path: 'test/apitest.txt',
  })

  return await result.data.sha;
}

async function test() {
  const resultForUrl = await octokit.request(
    "GET /repos/bloodstrawberry/auto-test/contents/test/password.txt",
    {
      owner: "bloodstrawberry",
      repo: "auto-test",
      path: "test/password.txt",
      headers: {
        Accept: 'application/vnd.github.v3.raw', // Set the Accept header for streaming content
        //Accept: 'application/json; charset=utf-8'
      },
    }
  );

  const downloadUrl = resultForUrl;

  console.log(downloadUrl);
  //console.log(downloadUrl.data.download_url);
  return;


  const result = await octokit.request({
    method: "GET",
    url: downloadUrl.data.download_url,
    // headers: {
    //   Accept: 'application/octet-stream',
    // },
        headers: { 
    'X-GitHub-Api-Version': '2022-11-28', 
  },
    responseType: 'stream',
  });

  console.log(result);
}

test();