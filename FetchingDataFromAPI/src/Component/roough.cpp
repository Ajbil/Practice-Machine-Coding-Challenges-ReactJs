#include <iostream>
#include <cstdio>
#include <ctime>

using namespace std;

struct node
{
	int e;
	struct node *path[10];
};

int prodf[400],prodlen;
char bstr[123456];
struct node *posStack[300];
int stackSize=0;

struct node* addEdge(struct node *start, int edge)
{
    if (start->path[edge]==NULL)
    {
        struct node *tempNode = new node;
        tempNode->e=0;
        for(int i=0;i<10;++i)
            tempNode->path[i]=NULL;
        start->path[edge]=tempNode;
    }
    return (start->path[edge]);
}

void markEnd(struct node *vnode)
{
    vnode->e=1;
}

int main()
{
	clock_t t_start =clock();
    prodlen=1;
	prodf[0]=1;
    struct node *automaton = new struct node;
    automaton->e=0;
    for(int i=0;i<10;++i)
        automaton->path[i]=NULL;
    struct node *ppos=automaton;
    ppos=addEdge(ppos,1);
    markEnd(ppos);
	for(int n=1;n<=800;++n)
	{
		int rem=0;
		for(int i=0;i<prodlen;++i)
		{
			rem=(2*prodf[i]+rem);
			prodf[i]=rem%10;
			rem/=10;
		}
		if(rem!=0)
			prodf[prodlen++]=rem;
		ppos=automaton;
		for(int i=prodlen-1;i>=0;--i)
		{
			ppos = addEdge(ppos,prodf[i]);
		}
		markEnd(ppos);
	}
    clock_t t_end=clock();
 //   cout<<(t_end+0.0-t_start)/CLOCKS_PER_SEC<<endl;

    int T,k;
    cin>>T;
    while(T--)
    {
    	long long ans=0;
    	stackSize=0;
    	scanf("%s",bstr);
    	for(int i=0,j;bstr[i]!='\0';++i)
    	{
    		k=bstr[i]-'0';
    		for(j=0;j<stackSize;)
    		{
    			if(posStack[j]->path[k]!=NULL)
    			{
    				posStack[j]=posStack[j]->path[k];
    				if(posStack[j]->e==1)
    					ans++;
    				++j;
    			}
    			else
    				posStack[j]=posStack[--stackSize];
    		}
    		if(automaton->path[k]!=NULL)
    		{
    			posStack[stackSize]=automaton->path[k];
    			if(posStack[stackSize]->e==1)
    				ans++;
    			++stackSize;
    		}
    	}
    	cout<<ans<<endl;
    }

    return 0;
}
