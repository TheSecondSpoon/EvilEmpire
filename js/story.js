export var stories  = {
    storytext :[],
    storiescompleted:[],
};

export default function log(index){
    if(stories.storiescompleted[index] == null){
        stories.storiescompleted[index] = true;
    }
    document.getElementById(index).innerHTML = stories.storytext[index];
}

export function writeStory(){
    stories.storytext[0] =
        "You are a Lumancer, destined to make light. Yhi, the god of light, gave you flint. With the power of flint and your lightbending powers you'll be able " +
        "to create even more light soon.";
    stories.storytext[1] = "You've created your first torch! This will create lumen on it's own!";
    stories.storytext[2] = "With your increased power you created the first campfire!";
    stories.storytext[3] = "What is larger than a campfire? A bonfire, of course. Yhi should be proud!";
    stories.storytext[4] = "";
    stories.storytext[5] = "";
    stories.storytext[6] = "";
}
