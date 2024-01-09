let myKey = "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";

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: myKey,
});

async function renameFile() {
  const owner = "bloodstrawberry";
  const repo = "auto-test";
  const oldPath = "test/apitest.txt";
  const newPath = "test/apitest_new.txt";

  const result = await octokit.request(
    `GET /repos/${owner}/${repo}/contents/${oldPath}`,
    {
      owner,
      repo,
      path: oldPath,
    }
  );

  console.log(result);

  if(result.status !== 200) {
    console.log("File Read Error!");
    return;
  }
  
  const file = result.data;

  const renameResult = await octokit.request(
    `PUT /repos/${owner}/${repo}/contents/${newPath}`,
    {
      owner,
      repo,
      path: newPath,

      content: file.content,
      message: "Rename file",
      sha: file.sha,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  console.log(renameResult);
  if(renameResult.status !== 201) { // 200인 경우는 이미 존재하는 파일을 덮어씌움.
    console.log("File Create Error!");
    return;
  }

  const deleteResult = await octokit.request(
    `DELETE /repos/${owner}/${repo}/contents/${oldPath}`,
    {
      owner,
      repo,
      path: oldPath,
      message : "delete!!",
      sha: file.sha,        
    }
  );
  
  console.log(deleteResult);
  if(deleteResult.status !== 200) {
    console.log("File Delete Error!");
    return;
  }
}

renameFile();
